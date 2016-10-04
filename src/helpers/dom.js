const boundEvents = []

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

const UA = window.navigator.userAgent.toLowerCase()
const isIE9 = UA && UA.indexOf('msie 9.0') > 0

// Transition property/event sniffing
export let transitionProp = 'transition'
export let transitionEndEvent = 'transitionend'
export let animationProp = 'animation'
export let animationEndEvent = 'animationend'

if (!isIE9) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition'
    transitionEndEvent = 'webkitTransitionEnd'
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation'
    animationEndEvent = 'webkitAnimationEnd'
  }
}
