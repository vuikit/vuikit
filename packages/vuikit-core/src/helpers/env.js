const win = window
const doc = document.body
const docEl = document.documentElement

export const Observer = win.MutationObserver || win.WebKitMutationObserver
export const requestAnimationFrame = win.requestAnimationFrame || (fn => setTimeout(fn, 1000 / 60))

// var hasTouchEvents = 'ontouchstart' in win
// var hasPointerEvents = win.PointerEvent
// export const hasTouch = 'ontouchstart' in win ||
//     win.DocumentTouch && doc instanceof DocumentTouch ||
//     navigator.msPointerEnabled && navigator.msMaxTouchPoints || // IE 10
//     navigator.pointerEnabled && navigator.maxTouchPoints // IE >=11

// export const pointerDown = !hasTouch ? 'mousedown' : `mousedown ${hasTouchEvents ? 'touchstart' : 'pointerdown'}`
// export const pointerMove = !hasTouch ? 'mousemove' : `mousemove ${hasTouchEvents ? 'touchmove' : 'pointermove'}`
// export const pointerUp = !hasTouch ? 'mouseup' : `mouseup ${hasTouchEvents ? 'touchend' : 'pointerup'}`
// export const pointerEnter = hasTouch && hasPointerEvents ? 'pointerenter' : 'mouseenter'
// export const pointerLeave = hasTouch && hasPointerEvents ? 'pointerleave' : 'mouseleave'

export const transitionend = prefix('transition', 'transition-end')
export const animationstart = prefix('animation', 'animation-start')
export const animationend = prefix('animation', 'animation-end')

function prefix (name, event) {
  const ucase = classify(name)
  const lowered = classify(event).toLowerCase()
  const classified = classify(event)
  const element = doc.body || docEl
  const names = {
    [name]: lowered,
    [`Webkit${ucase}`]: `webkit${classified}`,
    [`Moz${ucase}`]: lowered,
    [`o${ucase}`]: `o${classified} o${lowered}`
  }

  for (name in names) {
    if (element.style[name] !== undefined) {
      return names[name]
    }
  }
}

function classify (str) {
  return str.replace(/(?:^|[-_/])(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}
