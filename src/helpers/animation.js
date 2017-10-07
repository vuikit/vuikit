import { domClass, domEvent, css } from '@vuikit/util'
import { requestAnimationFrame, animationend } from '~/helpers/env'

const { hasClass, addClass, removeClass } = domClass
const { one } = domEvent

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
    var event = document.createEvent('Event')
    event.initEvent('animationend', true, true)
    element.dispatchEvent(event)
    return event.promise || Promise.resolve()
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
    addClass(element, `${cls} ${animation}`)

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

function promise (executor) {
  return new window.Promise(executor)
}
