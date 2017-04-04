import { animationend, promise, requestAnimationFrame, isUndefined } from './index'

export const isRtl = document.documentElement.getAttribute('dir') === 'rtl'

export const Animation = {
  in (element, animation, duration, origin) {
    return animate(element, animation, duration, origin, false)
  },
  out (element, animation, duration, origin) {
    return animate(element, animation, duration, origin, true)
  },
  inProgress (element) {
    return hasClass(element, 'uk-animation-enter') || hasClass(element, 'uk-animation-leave')
  },
  cancel (element) {
    // var e = $.Event(animationend || 'animationend')
    // $(element).triggerHandler(e)
    // return e.promise || promise.resolve()
  }
}

export function animate (element, animation, duration = 200, origin, out) {
  var p = promise(resolve => {
    var cls = out ? 'uk-animation-leave' : 'uk-animation-enter'

    if (animation.lastIndexOf('uk-animation-', 0) === 0) {
      if (origin) {
        animation += ` uk-animation-${origin}`
      }
      if (out) {
        animation += ' uk-animation-reverse'
      }
    }

    reset()

    one(element, animationend || 'animationend', e => {
      e.promise = p
      p.then(reset)
      resolve()
    })
    css(element, 'animation-duration', `${duration}ms`)
    addClass(element, animation)
    addClass(element, cls)

    if (!animationend) {
      requestAnimationFrame(() => Animation.cancel(element))
    }

    function reset () {
      css(element, 'animation-duration', '')
      removeClass(element, `${cls} ${animation}`)
    }
  })

  return p
}

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

// export function attrFilter (element, attr, pattern, replacement) {
//   element = $(element)
//   return element.attr(attr, (i, value) => value ? value.replace(pattern, replacement) : value)
// }
//
// export function removeClass (element, cls) {
//   return attrFilter(element, 'class', new RegExp(`(^|\\s)${cls}(?!\\S)`, 'g'), '')
// }

function sanitizeClasses (classes) {
  return classes.split(' ').filter(c => c)
}

/* Retrieve style */

export function css (el, style, value) {
  // retrieve
  if (isUndefined(value)) {
    return window.getComputedStyle(el)[style]
  }
  // or add style
  el.style[style] = value
}

/* Events */

var boundEvents = []

// add event listener shorthand
export function on (el, type, listener, namespace = 'default') {
  boundEvents[namespace] = boundEvents[namespace] || []
  boundEvents[namespace].push({ el, type, listener })
  el.addEventListener(type, listener)
}

export function off (el, type, namespace = 'default') {
  const event = boundEvents[namespace].find(bound => {
    return bound.el === el && bound.type === type
  })
  if (event) {
    el.removeEventListener(type, event.listener)
  }
}

export function one (el, type, listener) {
  const finalCallback = e => {
    listener(e)
    el.removeEventListener(type, finalCallback)
  }
  el.addEventListener(type, finalCallback)
}

export function offAll (namespace = 'default') {
  if (boundEvents[namespace] !== undefined) {
    for (let i = 0; i < boundEvents[namespace].length; ++i) {
      const { el, event, handler } = boundEvents[namespace][i]
      el.removeEventListener(event, handler)
    }
  }
}
