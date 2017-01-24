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

export function hasClass (el, className) {
  return el.classList.contains(className)
}

export function addClass (el, classes) {
  return classes.split(' ').filter(c => c).forEach(className => _addClass(el, className))
}

const _addClass = function (el, className) {
  if (el.classList) {
    el.classList.add(className)
  } else {
    // IE9
    el.className += ' ' + className
  }
}

export function removeClass (el, classes) {
  return classes.split(' ').filter(c => c).forEach(className => _removeClass(el, className))
}

const _removeClass = function (el, className) {
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

/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
export function getClosest (elem, selector) {
  // Element.matches() polyfill
  const Element = window.Element
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s)
        let i = matches.length
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      }
  }

  // Get closest match
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem
  }

  return null
}
