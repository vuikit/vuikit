export const isRtl = document.documentElement.getAttribute('dir') === 'rtl'

export function toMs (time) {
  return !time
    ? 0
    : time.substr(-2) === 'ms'
      ? parseFloat(time)
      : parseFloat(time) * 1000
}

// force redraw/repaint for WebKit
export function forceRedraw (el) {
  el.offsetHeight // eslint-disable-line
}

export function offsetTop (element) {
  return element.getBoundingClientRect().top + getWindow(element).pageYOffset
}

export function getWindow (element) {
  return element.ownerDocument
    ? element.ownerDocument.defaultView
    : window
}
