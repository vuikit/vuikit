import { css } from 'vuikit/src/util/style'
import { warn } from 'vuikit/src/util/debug'
import { toggleClass } from 'vuikit/src/util/class'
import { trigger } from 'vuikit/src/util/event'
import { positionAt, flipPosition } from 'vuikit/src/util/dimensions'
import { get, isObject, isUndefined } from 'vuikit/src/util/lang'
import { positionBefore, positionAfter } from './events'

export default {
  inserted (el, binding, vnode) {
    const ctx = getContext(el, binding, vnode)

    if (ctx) {
      position(ctx)
    }
  },
  componentUpdated (el, binding, vnode) {
    const ctx = getContext(el, binding, vnode)

    if (ctx) {
      position(ctx)
    }
  }
}

function position (ctx) {
  const { el, props, vnode } = ctx
  const { target, position, offset, boundary, flip, mainClass } = props

  if (process.env.NODE_ENV !== 'production' && !position.match(/^((top|bottom)-(left|center|right))|((left|right)-(top|center|bottom))$/)) {
    warn(`v-position -> '${position}' -> no valid position`, vnode)
  }

  if (process.env.NODE_ENV !== 'production' && (!target || !target.tagName)) {
    warn(`v-position -> no valid target`, vnode)
  }

  let [dir, align] = position.split('-')

  trigger(el, positionBefore)

  // remove any position class
  const classesRx = new RegExp(`${mainClass}-(top|bottom|left|right)(-[a-z]+)?`)
  el.className = el.className.replace(classesRx, '')

  // reset pos
  css(el, { top: '', left: '' })

  const axis = getPositionAxis(position)

  const elAttach = axis === 'x'
    ? `${flipPosition(dir)} ${align}`
    : `${align} ${flipPosition(dir)}`

  const targetAttach = axis === 'x'
    ? `${dir} ${align}`
    : `${align} ${dir}`

  const elOffset = axis === 'x'
    ? `${dir === 'left' ? -1 * offset : offset}`
    : ` ${dir === 'top' ? -1 * offset : offset}`

  const targetOffset = null
  const { x, y } = positionAt(
    el,
    target,
    elAttach,
    targetAttach,
    elOffset,
    targetOffset,
    flip,
    boundary
  ).target

  dir = axis === 'x' ? x : y
  align = axis === 'x' ? y : x

  // add position class
  toggleClass(el, `${mainClass}-${dir}-${align}`, offset === false)

  trigger(el, positionAfter)
}

/**
 * Get the directive props
**/
function getProps (ctx) {
  const { vnode } = ctx
  const { value } = ctx.binding

  if (process.env.NODE_ENV !== 'production' && (isUndefined(value) || !isObject(value))) {
    warn('v-position configuration is missing or is not an Object', vnode.context)
  }

  const props = {
    target: get(value, 'target'),
    position: get(value, 'position', 'top-center'),
    boundary: get(value, 'boundary', window),
    flip: get(value, 'flip', true),
    offset: get(value, 'offset', false),
    mainClass: get(value, 'mainClass')
  }

  return props
}

/**
 * Get the context used across
**/
function getContext (el, binding, vnode) {
  const ctx = { el, binding, vnode }
  ctx.props = getProps(ctx)

  if (!ctx.props) {
    binding.def.unbind(el, binding)
    return
  }

  return ctx
}

function getPositionAxis (position) {
  const [dir] = position.split('-')
  return dir === 'top' || dir === 'bottom'
    ? 'y'
    : 'x'
}
