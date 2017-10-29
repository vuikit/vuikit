import { warn } from '~/helpers/debug'
import { Animation } from '~/helpers/animation'
import { positionAt, flipPosition, getPositionAxis } from '~/helpers/position'
import {
  on,
  off,
  css,
  get,
  isEmpty,
  addClass,
  includes,
  isObject,
  toInteger,
  removeClass
} from '@vuikit/util'

let delayedShow
const tooltip = {}
const uid = 'v-tooltip'

const positions = [
  'top',
  'top-left',
  'top-center',
  'top-right',

  'bottom',
  'bottom-left',
  'bottom-center',
  'bottom-right',

  'left',
  'left-center',
  'right',
  'right-center'
]

export default {
  inserted (target, binding, vnode) {
    const ctx = getContext(target, binding, vnode)

    if (ctx) {
      setEvents(ctx)
    }
  },
  componentUpdated (target, binding, vnode) {
    const ctx = getContext(target, binding, vnode)

    if (ctx) {
      setEvents(ctx)
      updateVisibles(ctx)
    }
  },
  unbind (target, binding) {
    hide()
    removeEvents(target)
  }
}

/**
 * SET / REMOVE events
**/
function setEvents (ctx) {
  removeEvents(ctx)
  on(ctx.target, 'mouseenter', () => show(ctx), uid)
  on(ctx.target, 'mouseleave', () => hide(ctx), uid)
}

function removeEvents (ctx) {
  off(ctx.target, 'mouseenter', uid)
  off(ctx.target, 'mouseleave', uid)
}

/**
 * SHOW / HIDE the tooltip
**/
function show (ctx) {
  const { props } = ctx
  const { outer, inner } = getTooltip()

  inner.innerHTML = props.content

  delayedShow = setTimeout(() => {
    document.body.appendChild(outer)
    const { dir, align } = positionTooltip(ctx)

    Animation.in({
      element: outer,
      duration: props.duration,
      origin: `${dir}-${align}`,
      animation: props.animationIn
    })

  }, props.delay)
}

function hide (ctx) {
  const { outer } = getTooltip()

  clearTimeout(delayedShow)

  removeClass(outer, 'uk-active')

  // remove from dom
  if (outer.parentNode) {
    outer.parentNode.removeChild(outer)

    // force recreating tooltip each time as in
    // edge situations redrawing doesn't work well
    delete tooltip.inner
    delete tooltip.outer
  }
}

/**
 * Update visible tooltips
**/
function updateVisibles (ctx) {
  // abort if no tooltip to update
  if (isEmpty(tooltip)) {
    return
  }

  const props = getProps(ctx)
  const { inner } = getTooltip()

  inner.innerHTML = props.content
  positionTooltip(ctx)
}

/**
 * Position tooltip
**/
function positionTooltip (ctx) {
  const { target, props } = ctx
  const { outer: tooltip } = getTooltip()
  const { position, offset, boundary, flip } = props

  let [dir, align = 'center'] = position.split('-')

  // remove any position class
  const classesRx = new RegExp(`uk-tooltip-(top|bottom|left|right)(-[a-z]+)?`)
  tooltip.className = tooltip.className.replace(classesRx, '')

  // reset pos
  css(tooltip, { top: '', left: '' })

  const axis = getPositionAxis(position)

  const elAttach = axis === 'x'
    ? `${flipPosition(dir)} ${align}`
    : `${align} ${flipPosition(dir)}`

  const targetAttach = axis === 'x'
    ? `${dir} ${align}`
    : `${align} ${dir}`

  const elOffset = axis === 'x'
    ? `${dir === 'left' ? -1 * offset : offset}`
    : `${dir === 'top' ? -1 * offset : offset}`

  const { x, y } = positionAt({
    flip,
    target,
    boundary,
    elAttach,
    elOffset,
    element: tooltip,
    targetAttach,
    targetOffset: null
  }).target

  dir = axis === 'x' ? x : y
  align = axis === 'x' ? y : x

  addClass(tooltip, `uk-tooltip-${dir}-${align} uk-active`)

  return {
    dir,
    align
  }
}

/**
 * Get tooltip props
**/
function getProps (ctx) {
  const { arg, value, vnode } = ctx.binding

  let delay = 1
  let offset = 0
  let flip = true
  let content = null
  let duration = 100
  let position = 'top'
  let boundary = window
  let animation = 'scale-up'

  if (isObject(value)) {
    content = value.content
    flip = get(value, 'flip', flip)
    delay = get(value, 'delay', delay)
    offset = toInteger(offset) || offset
    boundary = value.boundary || boundary
    duration = get(value, 'duration', duration)
    position = value.position || arg || position
    animation = get(value, 'animation', animation)
  } else {
    content = value
    position = arg || position
  }

  if (!includes(positions, position)) {
    warn('Invalid v-tooltip position', vnode)
    return false
  }

  if (!content) {
    warn('Invalid v-tooltip content', vnode)
    return false
  }

  // decompose animation
  const animations = animation.split(',')
  const animationIn = prefixAnimations(animations[0])

  return { delay, offset, flip, content, position, boundary, animationIn, duration }
}

/**
 * Prefix all animations (separated by space) with `uk-animation-`
**/
function prefixAnimations (str) {
  if (!str.trim()) {
    return ''
  }

  return str.match(/[\w-]+/g).map(v => `uk-animation-${v}`).join(' ')
}

/**
 * Get or create the tooltip element
**/
function getTooltip () {
  if (!isEmpty(tooltip)) {
    return tooltip
  }

  const outer = document.createElement('div')
  const inner = document.createElement('div')

  addClass(outer, 'uk-tooltip')
  addClass(inner, 'uk-tooltip-inner')

  outer.appendChild(inner)

  tooltip.outer = outer
  tooltip.inner = inner

  return tooltip
}

/**
 * Get the context used across
**/
function getContext (target, binding, vnode) {
  const ctx = { target, binding, vnode }
  ctx.props = getProps(ctx)

  if (!ctx.props) {
    binding.def.unbind(target, binding)
    return
  }

  return ctx
}
