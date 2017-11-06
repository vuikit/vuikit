import { transitionend } from '~/helpers/env'
import { one, addClass, removeClass } from '@vuikit/util'
import mergeData from '@vuikit/core/helpers/fn-data-merge'

const doc = document.documentElement

let active
let activeModals

export default {
  functional: true,
  render (h, { parent: modal, children, data }) {
    const def = {
      props: {
        css: false
      },
      on: {
        beforeEnter: (el) => {
          addClass(doc, 'uk-modal-page')

          modal.$nextTick(() => {
            // this.resize()
          })
        },
        enter: (el, done) => {
          // redraw workaround, necessary so the browser
          // doesn't try to apply it all in one step not
          // giving enough time for the transition to init
          el.offsetWidth // eslint-disable-line

          addClass(el, 'uk-open')

          // once uk-open transition finished
          one(el, transitionend, done, e => e.target === el)
        },
        afterEnter: (el) => {
          activeModals++

          if (active) {
            // close any active modal
            active.$emit('update:show', false)
          }

          // change current active modal
          active = modal
        },
        beforeLeave (el) {
          removeClass(el, 'uk-open')
        },
        leave (el, done) {
          // once uk-open transition finished
          one(el, transitionend, done, e => e.target === el)
        },
        afterLeave: (el) => {
          activeModals--

          if (!activeModals) {
            // remove page class if not active modals left
            removeClass(doc, 'uk-modal-page')
          }

          // if the closing modal is the active one,
          // unset it
          if (active === modal) {
            active = null
          }
        }
      }
    }

    return h('transition', mergeData(data, def), children)
  }
}
