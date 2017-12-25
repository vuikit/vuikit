import css from '@vuikit/core/helpers/css'
import Promise from '@vuikit/core/helpers/promise'
import { attr } from '@vuikit/core/helpers/dom/attr'
import { one } from '@vuikit/core/helpers/dom/event'
import { trigger } from '@vuikit/core/helpers/event'
import { toArray, startsWith } from '@vuikit/core/util'
import { hasClass, addClass, removeClass } from '@vuikit/core/helpers/dom/class'
import { animationend, requestAnimationFrame } from '@vuikit/core/helpers/dom/env'

const animationcancel = 'animationcancel'
const animationPrefix = 'uk-animation-'
const clsCancelAnimation = 'uk-cancel-animation'

export function animate ({ element, animation, origin, duration = 200, out = false }) {

  return Promise.all(toArray(element).map(animate))

  function animate (element) {
    return new Promise((resolve, reject) => {

      if (hasClass(element, clsCancelAnimation)) {
        requestAnimationFrame(() =>
          Promise.resolve().then(() =>
            animate.apply(null, arguments).then(resolve, reject)
          )
        )
        return
      }

      var cls = `${animation} ${animationPrefix}${out ? 'leave' : 'enter'}`

      if (startsWith(animation, animationPrefix)) {

        if (origin) {
          cls += ` ${animationPrefix}${origin}`
        }

        if (out) {
          cls += ` ${animationPrefix}reverse`
        }

      }

      resetAnimation(element)

      one(element, `${animationend || 'animationend'} ${animationcancel}`, ({type}) => {

        var hasReset = false

        if (type === animationcancel) {
          reject(new Error('UIkit animation canceled')) // eslint-disable-line
          resetAnimation(element)
        } else {
          resolve()
          Promise.resolve().then(() => {
            hasReset = true
            resetAnimation(element)
          })
        }

        requestAnimationFrame(() => {
          if (!hasReset) {
            addClass(element, clsCancelAnimation)

            requestAnimationFrame(() => removeClass(element, clsCancelAnimation))
          }
        })

      }, e => element === e.target)

      css(element, 'animationDuration', `${duration}ms`)
      addClass(element, cls)

      if (!animationend) {
        requestAnimationFrame(() => Animation.cancel(element))
      }
    })
  }
}

function resetAnimation (element) {
  css(element, 'animationDuration', '')

  // remove animation classes
  const classesRE = new RegExp(`${animationPrefix}\\S*`, 'g')
  element.className = element.className.replace(classesRE, '')
}

const inProgress = new RegExp(`${animationPrefix}(enter|leave)`)

export const Animation = {

  in ({ element, animation, duration, origin }) {
    try {
      return animate({ element, animation, duration, origin, out: false })
    } catch (e) {
      console.log(e)
    }
  },

  out ({ element, animation, duration, origin }) {
    try {
      return animate({ element, animation, duration, origin, out: true })
    } catch (e) {
      console.log(e)
    }
  },

  inProgress (element) {
    return inProgress.test(attr(element, 'class'))
  },

  cancel (element) {
    trigger(element, animationcancel)
  }

}
