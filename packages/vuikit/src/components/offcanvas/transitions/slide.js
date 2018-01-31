import { css } from 'vuikit/core/util/style'
import { one } from 'vuikit/core/util/dom/event'
import mergeData from 'vuikit/core/util/vue-data-merge'
import { width, height } from 'vuikit/core/util/position'
import { addClass, removeClass } from 'vuikit/core/util/class'

import common from './_common'

const win = window
const doc = document.documentElement

export default {
  functional: true,
  render (h, { parent: vm, data, children }) {

    const def = {
      props: {
        css: false
      },
      on: {
        beforeEnter (el) {
          const scrollbarWidth = width(win) - doc.offsetWidth

          css(doc, 'overflowY', scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          )

          addClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide')
        },
        enter (el, done) {
          height(el) // force reflow
          addClass(el, 'uk-open')

          // indicate end of transition
          one(el, 'transitionend', done, e => e.target === vm.$refs.bar)
        },
        beforeLeave (el) {
          removeClass(el, 'uk-open')
        },
        leave (el, done) {
          // save the ref before event end
          // as the vm will be deleted after
          const bar = vm.$refs.bar
          // indicate end of transition
          one(el, 'transitionend', done, e => e.target === bar)
        },
        afterLeave (el) {
          removeClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide')
        }
      }
    }

    return h('transition', mergeData(data, def, common(vm)), children)
  }
}
