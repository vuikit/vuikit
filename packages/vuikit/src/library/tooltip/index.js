import { $ } from 'vuikit/src/util/core'
import { css } from 'vuikit/src/util/style'
import { warn } from 'vuikit/src/util/debug'
import { isTouch } from 'vuikit/src/util/touch'
import { Promise } from 'vuikit/src/util/promise'
import { matches } from 'vuikit/src/util/selector'
import { Animation } from 'vuikit/src/util/animation'
import { isVisible } from 'vuikit/src/util/filter'
import { on, trigger } from 'vuikit/src/util/event'
import { hasAttr, attr } from 'vuikit/src/util/attr'
import { append, remove } from 'vuikit/src/util/dom'
import { pointerEnter, pointerDown, pointerLeave } from 'vuikit/src/util/env'
import { isNumeric, assign, isString, hyphenate } from 'vuikit/src/util/lang'
import { positionAt, flipPosition, offset as getOffset } from 'vuikit/src/util/dimensions'
import { addClass, toggleClass, removeClasses, removeClass } from 'vuikit/src/util/class'

const NAMESPACE = '__vkTooltip'

export default {
  bind (el, binding, vnode) {
    el[NAMESPACE] = {
      vnode,
      state: null, // in, out, active
      options: getOptions({ binding })
    }

    if (hasAttr(el, 'title')) {
      el[NAMESPACE].attrTitle = attr(el, 'title')
      attr(el, { title: '' })
    }

    el[NAMESPACE].title = el[NAMESPACE].options.title || el[NAMESPACE].attrTitle
  },
  inserted (el, binding, vnode) {
    bindEvents(el)
  },
  componentUpdated (el, binding, vnode) {
    el[NAMESPACE].options = getOptions({ binding })
    el[NAMESPACE].title = el[NAMESPACE].options.title || el[NAMESPACE].attrTitle
  },
  unbind (el, binding, vnode) {
    if (!el[NAMESPACE]) {
      return
    }

    _hide(el)
    attr(el, { title: el[NAMESPACE].attrTitle || null })
    el[NAMESPACE].unbindEvents()
    delete el[NAMESPACE]
  }
}

function bindEvents (el) {
  const events = [
    on(el, `focus ${pointerEnter} ${pointerDown}`, e => {
      if (e.type !== pointerDown || !isTouch(e)) {
        show(el)
      }
    }),
    on(el, 'blur', e => hide(el)),
    on(el, pointerLeave, e => {
      if (!isTouch(e)) {
        hide(el)
      }
    })
  ]

  el[NAMESPACE].unbindEvents = () => events.forEach(unbind => unbind())
}

function toggleIn (el) {
  const { cls, position, animation, duration } = el[NAMESPACE].options

  // allow canceling the toggle
  if (!trigger(el, 'beforeShow')) {
    return Promise.reject() // eslint-disable-line
  }

  const origin = el[NAMESPACE].origin = getOrigin(position)
  const tooltip = el[NAMESPACE].tooltip = createTooltip(el)

  positionTooltip(el)
  addClass(tooltip, cls)

  // watchout if the element loose visibility
  // and hide the tooltip if does
  el[NAMESPACE].hideTimer = setInterval(() => {
    if (!isVisible(el)) {
      hide(el)
    }
  }, 150)

  // indicate animation is in progress
  el[NAMESPACE].state = 'in'
  trigger(el, 'show')

  return Animation
    .in(tooltip, `uk-animation-${animation[0]}`, duration, origin)
    .then(() => {
      el[NAMESPACE].state = 'active'
      trigger(el, 'shown')
    })
    // ignore the ocasional errors, seems animation related
    .catch(() => {})
}

function toggleOut (el) {
  const { tooltip } = el[NAMESPACE]
  const { animation, duration } = el[NAMESPACE].options

  // allow canceling the toggle
  if (!trigger(el, 'beforeHide')) {
    return Promise.reject() // eslint-disable-line
  }

  // cancel any current animation
  Animation.cancel(tooltip)

  // indicate animation is in progress
  el[NAMESPACE].state = 'out'
  trigger(el, 'hide')

  // if no animation return immediately
  if (!animation[1]) {
    return Promise.resolve().then(() => _hide(el))
  }

  return Animation
    .out(tooltip, `uk-animation-${animation[1]}`, duration, origin)
    .then(() => _hide(el))
    // ignore the ocasional errors, seems animation related
    .catch(() => {})
}

function show (el) {
  const { delay } = el[NAMESPACE].options
  const { state, title } = el[NAMESPACE]

  // cancel if no title, already active or show delayed
  if (!title || state === 'active' || el[NAMESPACE].showTimer) {
    return
  }

  if (state === 'out') {
    Animation.cancel(el)
    _hide(el) // hide immediately
  }

  el[NAMESPACE].showTimer = setTimeout(() => toggleIn(el), delay)
}

function hide (el) {
  if (!el[NAMESPACE]) {
    return
  }

  const { state } = el[NAMESPACE]

  // clear timers in order
  // to cancel any delayed show
  clearAllTimers(el)

  // cancel hiding if is already being hidden or
  // tooltip is attached to a focused input
  if (state === 'out' || (matches(el, 'input') && isFocused(el))) {
    return
  }

  toggleOut(el)
}

function _hide (el) {
  if (!el[NAMESPACE]) {
    return
  }

  const { tooltip } = el[NAMESPACE]
  const { cls } = el[NAMESPACE].options

  attr(el, 'aria-expanded', false)
  removeClass(tooltip, cls)
  tooltip && remove(tooltip)
  el[NAMESPACE].state = null
  el[NAMESPACE].tooltip = null

  trigger(el, 'hidden')
}

function clearAllTimers (el) {
  clearTimeout(el[NAMESPACE].showTimer)
  clearTimeout(el[NAMESPACE].hideTimer)
  el[NAMESPACE].showTimer = null
  el[NAMESPACE].hideTimer = null
}

function positionTooltip (el) {
  const target = el
  const { tooltip } = el[NAMESPACE]
  const { clsPos, position } = el[NAMESPACE].options
  let { offset } = el[NAMESPACE].options

  let node
  let [dir, align = 'center'] = position.split('-')

  removeClasses(tooltip, `${clsPos}-(top|bottom|left|right)(-[a-z]+)?`)
  css(tooltip, { top: '', left: '' })

  const axis = getAxis(position)

  offset = isNumeric(offset)
    ? offset
    : (node = $(offset))
      ? getOffset(node)[axis === 'x' ? 'left' : 'top'] - getOffset(target)[axis === 'x' ? 'right' : 'bottom']
      : 0

  const elAttach = axis === 'x'
    ? `${flipPosition(dir)} ${align}`
    : `${align} ${flipPosition(dir)}`

  const targetAttach = axis === 'x'
    ? `${dir} ${align}`
    : `${align} ${dir}`

  const elOffset = axis === 'x'
    ? `${dir === 'left' ? -1 * offset : offset}`
    : `${dir === 'top' ? -1 * offset : offset}`

  const targetOffset = null
  const { x, y } = positionAt(
    tooltip,
    target,
    elAttach,
    targetAttach,
    elOffset,
    targetOffset,
    true
  ).target

  dir = axis === 'x' ? x : y
  align = axis === 'x' ? y : x

  toggleClass(tooltip, `${clsPos}-${dir}-${align}`, el[NAMESPACE].options.offset === false)

  return {
    dir,
    align
  }
}

function getOptions (ctx) {
  let { value, modifiers } = ctx.binding

  if (isString(value)) {
    value = { title: value }
  }

  if (Object.keys(modifiers).length) {
    const firstKey = Object.keys(modifiers)[0]
    modifiers = { position: firstKey }
  }

  const options = assign({
    delay: 0,
    title: '',
    offset: false,
    duration: 100,
    position: 'top',
    container: true,
    cls: 'uk-active',
    clsPos: 'uk-tooltip',
    animation: 'scale-up'
  }, modifiers, value)

  // coerce
  options.position = hyphenate(options.position)
  options.animation = options.animation.split(' ')

  // check
  if (process.env.NODE_ENV !== 'production') {
    const { position: pos } = options

    if (!(/^(top|bottom)-(left|right)$/.test(pos) || /^(top|bottom|left|right)$/.test(pos))) {
      warn(`v-vk-tooltip -> '${pos}' is not a valid position value`, ctx.vnode)
    }
  }

  return options
}

function getAxis (position) {
  const [dir] = position.split('-')
  return dir === 'top' || dir === 'bottom' ? 'y' : 'x'
}

function getContainer (el) {
  const { vnode } = el[NAMESPACE]
  const { container } = el[NAMESPACE].options
  return (container === true && vnode.context.$root.$el) || (container && $(container))
}

function createTooltip (el) {
  const { title } = el[NAMESPACE]
  const { clsPos } = el[NAMESPACE].options

  return append(getContainer(el), `<div class="${clsPos}" aria-hidden>
    <div class="${clsPos}-inner">${title}</div>
  </div>`)
}

function getOrigin (position) {
  const [dir, align] = position

  return getAxis(position) === 'y'
    ? `${flipPosition(dir)}-${align}`
    : `${align}-${flipPosition(dir)}`
}

function isFocused (el) {
  return el === document.activeElement
}
