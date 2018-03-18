import { css } from 'vuikit/src/util/style'
import { addClass, removeClass } from 'vuikit/src/util/class'
import { mergeData } from 'vuikit/src/util/vue'

import { events, scrollbarWidth, doc } from './_common'

export default {
  functional: true,
  render (h, { data, children }) {
    const def = {
      props: {
        css: false
      },
      on: {
        enter: (el, done) => done(),
        leave: (el, done) => done(),
        beforeEnter (el) {
          const { $refs, $props } = el.__vkOffcanvas

          // run common transition actions
          events.beforeEnter(el)

          css(doc, 'overflowY', scrollbarWidth && $props.overlay
            ? 'scroll'
            : ''
          )

          addClass(el, 'uk-open')
          addClass($refs.bar, 'uk-offcanvas-none')
        },
        afterEnter (el) {
          // run common transition actions
          events.afterEnter(el)
        },
        afterLeave (el) {
          const { $refs } = el.__vkOffcanvas

          removeClass(el, 'uk-open')
          removeClass($refs.bar, 'uk-offcanvas-none')

          // run common transition actions
          events.afterLeave(el)
        }
      }
    }

    return h('transition', mergeData(def, data), children)
  }
}
