import { isUndefined } from '@vuikit/core/util'

/**
 * Get or Set an element style property
 */
export default function (el, style, val) {
  if (isUndefined(val)) {
    return _getStyle(el, style)
  } else {
    el.style[style] = val
  }
}

function _getStyle (el, style) {
  if (!el || !style) {
    return
  }

  return window.getComputedStyle
    ? window.getComputedStyle(el, null)[style]
    : el.currentStyle[style]
}
