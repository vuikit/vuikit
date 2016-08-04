const boundEvents = []

// add event listener shorthand
export function on (el, event, handler, namespace = 'def') {
  boundEvents[namespace] = boundEvents[namespace] || []
  boundEvents[namespace].push({ el, event, handler })
  el.addEventListener(event, handler)
}

export function offAll (namespace) {
  for (let i = 0; i < boundEvents[namespace].length; ++i) {
    const { el, event, handler } = boundEvents[namespace][i]
    el.removeEventListener(event, handler)
  }
}

export function addClass (el, className) {
  if (el.classList) {
    el.classList.add(className)
  } else {
    // IE9
    el.className += ' ' + className
  }
}

export function removeClass (el, className) {
  if (el.classList) {
    el.classList.remove(className)
  } else {
    // IE9
    el.className = el.className.replace(new RegExp(`^${className}$`), '')
  }
}

export function css (el, style) {
  return window.getComputedStyle(el)[style]
}
