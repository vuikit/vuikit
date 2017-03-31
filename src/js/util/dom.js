
/* Add/Remove class */

export function hasClass (el, className) {
  return el.classList.contains(className)
}

export function addClass (el, classes) {
  return sanitizeClasses(classes).forEach(className => _addClass(el, className))
}

function _addClass (el, className) {
  el.classList.add(className)
}

export function removeClass (el, classes) {
  return sanitizeClasses(classes).forEach(className => _removeClass(el, className))
}

export function _removeClass (el, className) {
  el.classList.remove(className)
}

function sanitizeClasses (classes) {
  return classes.split(' ').filter(c => c)
}

/* Retrieve style */

export function css (el, style) {
  return window.getComputedStyle(el)[style]
}

/* Events */

var boundEvents = []

// add event listener shorthand
export function on (el, event, handler, namespace = 'def') {
  boundEvents[namespace] = boundEvents[namespace] || []
  boundEvents[namespace].push({ el, event, handler })
  el.addEventListener(event, handler)
}

export function offAll (namespace = 'def') {
  if (boundEvents[namespace] !== undefined) {
    for (let i = 0; i < boundEvents[namespace].length; ++i) {
      const { el, event, handler } = boundEvents[namespace][i]
      el.removeEventListener(event, handler)
    }
  }
}
