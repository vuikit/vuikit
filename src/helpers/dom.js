import { attr } from '~/helpers/attr'
import { trigger } from '~/helpers/event'
import { requestAnimationFrame, animationend } from '~/helpers/env'
import { css, hasClass, addClass, removeClass, one, startsWith, toArray } from '@vuikit/util'

const animationcancel = 'animationcancel'
const animationPrefix = 'uk-animation-'
const clsCancelAnimation = 'uk-cancel-animation'

export function animate ({ element, animation, duration = 200, origin, out }) {

  return Promise.all(toArray(element).map(element =>
    new Promise((resolve, reject) => {

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

      reset()

      one(element, `${animationend || 'animationend'} ${animationcancel}`, ({type}) => {

        var hasReset = false

        if (type === animationcancel) {
          reject() // eslint-disable-line
          reset()
        } else {
          resolve()
          Promise.resolve().then(() => {
            hasReset = true
            reset()
          })
        }

        requestAnimationFrame(() => {
          if (!hasReset) {
            addClass(element, clsCancelAnimation)

            requestAnimationFrame(() => removeClass(element, clsCancelAnimation))
          }
        })

      }, ({target}) => element === target)

      css(element, 'animationDuration', `${duration}ms`)
      addClass(element, cls)

      if (!animationend) {
        requestAnimationFrame(() => Animation.cancel(element))
      }

      function reset () {
        css(element, 'animationDuration', '')

        // remove animation classes
        const classesRE = new RegExp(`${animationPrefix}\\S*`)
        element.className = element.className.replace(classesRE, '')
      }

    })
  ))

}

var inProgress = new RegExp(`${animationPrefix}(enter|leave)`)
export const Animation = {

  in (element, animation, duration, origin) {
    return animate(element, animation, duration, origin, false)
  },

  out (element, animation, duration, origin) {
    return animate(element, animation, duration, origin, true)
  },

  inProgress (element) {
    return inProgress.test(attr(element, 'class'))
  },

  cancel (element) {
    trigger(element, animationcancel)
  }

}
