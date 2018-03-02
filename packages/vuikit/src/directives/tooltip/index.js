import { $ } from 'vuikit/src/util/core'
import { on } from 'vuikit/src/util/event'
import { css } from 'vuikit/src/util/style'
import { warn } from 'vuikit/src/util/debug'
import { isTouch } from 'vuikit/src/util/touch'
import { matches } from 'vuikit/src/util/selector'
import { Animation } from 'vuikit/src/util/animation'
import { hasAttr, attr } from 'vuikit/src/util/attr'
import { append, remove } from 'vuikit/src/util/dom'
import { within, isVisible } from 'vuikit/src/util/filter'
import { pointerEnter, pointerDown, pointerLeave } from 'vuikit/src/util/env'
import { positionAt, flipPosition, offset as getOffset } from 'vuikit/src/util/dimensions'
import { includes, isObject, isNumeric, assign, isString } from 'vuikit/src/util/lang'
import { addClass, toggleClass, removeClasses, removeClass } from 'vuikit/src/util/class'

const actives = []

export default {
  bind (el, binding, vnode) {
    el.__vkTooltip = {
      options: getOptions({ binding }),
      _hasTitle: hasAttr(el, 'title')
    }

    attr(el, { title: '' })

    setEvents(el, { binding, vnode })
  },
  componentUpdated (el, binding, vnode) {
    el.__vkTooltip.options = getOptions({ binding })
  },
  unbind (el, binding, vnode) {
    hide(el)
    attr(el, {
      title: el.__vkTooltip._hasTitle
        ? el.__vkTooltip.title
        : null
    })
  }
}

function setEvents (el, ctx) {
  on(el, `focus ${pointerEnter} ${pointerDown}`, e => {
    if (e.type !== pointerDown || !isTouch(e)) {
      show(el, ctx)
    }
  })

  on(el, 'blur', () => hide(el))

  on(el, pointerLeave, e => {
    if (!isTouch(e)) {
      hide(el)
    }
  })
}

function show (el, ctx) {

  if (includes(actives, el)) {
    return
  }

  const { clsPos, title, position, delay } = el.__vkTooltip.options
  const [dir, align] = position

  actives.forEach(active => hide(active))
  actives.push(el)

  el.__vkTooltip._unbind = on(document, 'click', e => !within(e.target, el) && hide(el))

  clearTimeout(el.__vkTooltip.showTimer)

  el.__vkTooltip.tooltip = append(getContainer(el, ctx), `<div class="${clsPos}" aria-hidden><div class="${clsPos}-inner">${title}</div></div>`)

  positionTooltip(el)

  el.__vkTooltip.origin = getAxis(position) === 'y' ? `${flipPosition(dir)}-${align}` : `${align}-${flipPosition(dir)}`

  el.__vkTooltip.showTimer = setTimeout(() => {

    _toggleAnimation(el, true)

    el.__vkTooltip.hideTimer = setInterval(() => {

      if (!isVisible(el)) {
        hide(el)
      }

    }, 150)

  }, delay)
}

function _toggleAnimation (el, show) {
  const { origin, tooltip } = el.__vkTooltip
  const { animation, duration, cls } = el.__vkTooltip.options

  Animation.cancel(tooltip)

  if (show) {
    addClass(tooltip, cls)
    return Animation.in(tooltip, animation[0], duration, origin)
      .catch(() => {}) // ignore the ocasional errors, seems animation related
  }

  return Animation.out(tooltip, animation[1] || animation[0], duration, origin)
    .then(() => removeClass(tooltip, cls))
}

function hide (el) {
  const { tooltip, showTimer, hideTimer } = el.__vkTooltip
  const index = actives.indexOf(el)

  if (!~index || (matches(el, 'input') && el === document.activeElement)) {
    return
  }

  actives.splice(index, 1)

  clearTimeout(showTimer)
  clearInterval(hideTimer)
  attr(el, 'aria-expanded', false)
  _toggleAnimation(el, false)
  tooltip && remove(tooltip)
  el.__vkTooltip.tooltip = false
  el.__vkTooltip._unbind()
}

function positionTooltip (el) {
  const target = el
  const { tooltip } = el.__vkTooltip
  const { clsPos, position } = el.__vkTooltip.options
  let { offset } = el.__vkTooltip.options

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

  toggleClass(tooltip, `${clsPos}-${dir}-${align}`, el.__vkTooltip.options.offset === false)

  return {
    dir,
    align
  }
}

function getOptions (ctx) {
  const { value } = ctx.binding

  let options = {
    delay: 0,
    title: '',
    offset: false,
    duration: 100,
    position: 'top',
    container: true,
    cls: 'uk-active',
    clsPos: 'uk-tooltip',
    animation: ['uk-animation-scale-up', 'uk-animation-scale-up']
  }

  if (isObject(value)) {
    options = assign(options, value)
  } else if (isString(value)) {
    options.title = value
  }

  if (process.env.NODE_ENV !== 'production' && !(
    /^(top|bottom)-(left|right)$/.test(options.position) ||
    /^(top|bottom|left|right)$/.test(options.position)
  )) {
    warn('v-vk-tooltip -> invalid position', ctx.vnode)
  }

  if (process.env.NODE_ENV !== 'production' && !options.title) {
    warn('v-vk-tooltip -> invalid title', ctx.vnode)
  }

  return options
}

function getAxis (position) {
  const [dir] = position.split('-')
  return dir === 'top' || dir === 'bottom' ? 'y' : 'x'
}

function getContainer (el, { vnode }) {
  const { container } = el.__vkTooltip.options
  return (container === true && vnode.context.$root.$el) || (container && $(container))
}
