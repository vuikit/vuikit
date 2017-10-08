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
