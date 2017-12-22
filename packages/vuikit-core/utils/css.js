/*
 * Determines if the value is undefined
 */
function isUndefined (val) {
  return val === undefined
}

/**
 * Get or Set an element style property
 */
function css (el, style, val) {
  if (isUndefined(val)) {
    return _getStyle(el, style)
  } else {
    el.style[style] = val;
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

export default css;
