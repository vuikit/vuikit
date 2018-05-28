import { once } from 'vuikit/src/_core/utils/event'
import { addClass, removeClass } from 'vuikit/src/_core/utils/class'

import { SHOW, SHOWN, HIDE, HIDDEN } from './constants'
import { setAsActive, setAsInactive, active, activeCount } from './active'

const doc = typeof document !== 'undefined' && document.documentElement

export default {
  functional: true,
  render (h, { data, children, parent: modal }) {

    const def = {
      props: {
        css: false,
        appear: true
      },
      on: {
        beforeEnter () {
          modal.$emit(SHOW)
          addClass(doc, 'uk-modal-page')
        },
        enter (el, done) {
          const prev = active !== modal && active

          // close any active modal first
          if (prev) {
            prev.hide()

            // once prev modal is closed open the current one
            once(prev.$el, 'transitionend', () => doEnter(el, done), false, e => e.target === prev.$el)
            return
          }

          // using setTimeout as a workaround for appear and for edge
          // situations when the wrapper component hasn't been rendered yet
          setTimeout(() => doEnter(el, done), 0)
        },
        afterEnter (el) {
          setAsActive(modal)
          modal.$emit(SHOWN)
        },
        beforeLeave (el) {
          modal.$emit(HIDE)
          removeClass(el, 'uk-open')
        },
        leave (el, done) {
          once(el, 'transitionend', done, false, e => e.target === el)
        },
        afterLeave (el) {
          setAsInactive(modal)

          if (!activeCount) {
            removeClass(doc, 'uk-modal-page')
          }

          modal.$emit(HIDDEN)
        }
      }
    }

    function doEnter (el, done) {
      // append modal at $root as the styles
      // could be scoped to the app dom
      // re-append every time entering so it appears on top
      modal.$root.$el.appendChild(el)

      // redraw workaround, necessary so the browser
      // doesn't try to apply it all in one step, not
      // giving enough time for the transition to init
      el.offsetWidth // eslint-disable-line
      once(el, 'transitionend', done, false, e => e.target === el)

      addClass(el, 'uk-open')
    }

    return h('transition', def, children)
  }
}
