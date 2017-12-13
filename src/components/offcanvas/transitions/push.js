import css from '@vuikit/core/utils/css'
import { one } from '@vuikit/core/utils/event'
import { transitionend } from '@vuikit/core/helpers/env'
import mergeData from '@vuikit/core/helpers/fn-data-merge'
import { width, height } from '@vuikit/core/helpers/position'
import { addClass, removeClass } from '@vuikit/core/utils/class'

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

          css(doc, 'overflowY', vm.flip && scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          )

          addClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push')
        },
        enter (el, done) {
          height(el) // force reflow
          addClass(el, 'uk-open')
          addClass(vm.$refs.content, 'uk-offcanvas-content-animation')

          // indicate end of transition
          one(el, transitionend, done, e => e.target === vm.$refs.bar)
        },
        beforeLeave (el) {
          removeClass(el, 'uk-open')
          removeClass(vm.$refs.content, 'uk-offcanvas-content-animation')
        },
        leave (el, done) {
          // save the ref before event end
          // as the vm will be deleted after
          const bar = vm.$refs.bar
          // indicate end of transition
          one(el, transitionend, done, e => e.target === bar)
        },
        afterLeave (el) {
          removeClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push')
        }
      }
    }

    return h('transition', mergeData(data, def, common(vm)), children)
  }
}
