import { css } from 'vuikit/src/util/style'
import { width } from 'vuikit/src/util/position'
import mergeData from 'vuikit/src/util/vue-data-merge'
import { addClass, removeClass } from 'vuikit/src/util/class'

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
