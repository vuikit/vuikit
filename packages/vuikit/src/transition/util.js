import { css } from 'vuikit/src/_core/utils/style'
import { isObject } from 'vuikit/src/_core/utils/lang'

export function setDuration (el, duration) {
  css(el, 'animationDuration', `${duration}ms`)
}

export function reset (el) {
  css(el, 'animationDuration', '')
}

export function coerceProps (props) {
  const animation = expand(props.name)
  const duration = expand(props.duration)

  if (!animation.enter) {
    duration.enter = 0
  }

  if (!animation.leave) {
    duration.leave = 0
  }

  return { animation, duration }
}

function expand (obj) {
  return isObject(obj) ? obj : { enter: obj, leave: obj }
}
