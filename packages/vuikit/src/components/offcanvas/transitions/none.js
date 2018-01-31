import { css } from 'vuikit/core/util/style'
import { width } from 'vuikit/core/util/position'
import mergeData from 'vuikit/core/util/vue-data-merge'
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
        enter: (el, done) => done(),
        leave: (el, done) => done(),
        beforeEnter (el) {
          const scrollbarWidth = width(win) - doc.offsetWidth

          css(doc, 'overflowY', scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          )

          addClass(el, 'uk-open')
          addClass(vm.$refs.bar, 'uk-offcanvas-none')
        },
        afterLeave (el) {
          removeClass(el, 'uk-open')
          removeClass(vm.$refs.bar, 'uk-offcanvas-none')
        }
      }
    }

    return h('transition', mergeData(data, def, common(vm)), children)
  }
}
