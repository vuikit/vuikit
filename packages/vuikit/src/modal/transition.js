import { once } from 'vuikit/src/_core/utils/event'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { SHOW, SHOWN, HIDE, HIDDEN } from './constants'

export default {
  functional: true,
  render (h, { data, children, parent: modal }) {
    const def = {
      props: {
        css: false
      },
      on: {
        beforeEnter () {
          modal.$emit(SHOW)
          modal.setPage()
        },
        enter (el, done) {
          modal.open = true

          // force redraw, necessary
          el.offsetWidth // eslint-disable-line
          once(el, 'transitionend', done, false, e => e.target === el)
        },
        afterEnter () {
          modal.$emit(SHOWN)
        },
        beforeLeave () {
          modal.$emit(HIDE)
          modal.open = false
        },
        leave (el, done) {
          once(el, 'transitionend', done, false, e => e.target === el)
        },
        afterLeave () {
          modal.$emit(HIDDEN)
          modal.resetPage()
        }
      }
    }

    return h('transition', mergeData({}, data, def), children)
  }
}
