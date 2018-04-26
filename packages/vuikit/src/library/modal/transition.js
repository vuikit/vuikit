import { once, on } from 'vuikit/src/util/event'
import { addClass, removeClass } from 'vuikit/src/util/class'
import { SHOWN, HIDDEN, TOGGLE, KEYUP } from './constants'

const doc = typeof document !== 'undefined' && document.documentElement

export let active
export let activeModals

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
          addClass(doc, 'uk-modal-page')
        },
        enter (el, done) {
          const prev = active !== modal && active

          // if active modal exist, first close it
          if (prev && !modal.stack) {
            prev.hide()

            // once prev modal is closed open the current one
            once(prev.$el, 'transitionend', () => doEnter(el, done), false, e => e.target === prev.$el)
            return
          }

          doEnter(el, done)
        },
        afterEnter (el) {
          activeModals++
          active = modal

          active.$emit(SHOWN)
        },
        beforeLeave (el) {
          removeClass(el, 'uk-open')
        },
        leave (el, done) {
          once(el, 'transitionend', done, false, e => e.target === el)
        },
        afterLeave (el) {
          activeModals--

          if (!activeModals) {
            removeClass(doc, 'uk-modal-page')
          }

          if (active === modal) {
            active = null
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

      // using setTimeout as a workaround for appear
      setTimeout(() => addClass(el, 'uk-open'), 0)
    }

    return h('transition', def, children)
  }
}

on(doc, 'click', e => {
  if (!active) {
    return
  }

  const clickedOut = e.target === active.$el

  if (clickedOut && !active.stuck) {
    active.$emit(TOGGLE, false)
  }
})

on(doc, 'keyup', e => {
  active && active.$emit(KEYUP, e)
})
