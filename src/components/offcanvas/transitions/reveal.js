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
    let wrapper = vm.$refs.wrapper
    let bar

    const def = {
      props: {
        css: false
      },
      on: {
        beforeEnter (el) {
          const scrollbarWidth = width(win) - doc.offsetWidth

          width(vm.$refs.content, width(win) - scrollbarWidth)

          css(doc, 'overflowY', vm.flip && scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          )

          // wrap bar, required for this animation
          wrapper = document.createElement('div')
          addClass(wrapper, 'uk-offcanvas-reveal')
          el.appendChild(wrapper)
          wrapper.appendChild(vm.$refs.bar)
          vm.$refs.wrapper = wrapper // save ref
        },
        enter (el, done) {
          height(el) // force reflow
          addClass(el, 'uk-open')
          addClass(vm.$refs.content, 'uk-offcanvas-content-animation')

          // indicate end of transition
          one(el, transitionend, done, e => e.target === wrapper)
        },
        beforeLeave (el) {
          // set bar, required at afterLeave
          bar = vm.$refs.bar

          removeClass(el, 'uk-open')
          removeClass(vm.$refs.content, 'uk-offcanvas-content-animation')
        },
        leave (el, done) {
          // indicate end of transition
          one(el, transitionend, done, e => e.target === wrapper)
        },
        afterLeave (el) {
          // remove wrapper
          el.appendChild(bar)
          el.removeChild(wrapper)
        }
      }
    }

    return h('transition', mergeData(data, def, common(vm)), children)
  }
}
