import { css } from 'vuikit/src/util/style'
import { once } from 'vuikit/src/util/event'
import { height } from 'vuikit/src/util/dimensions'
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
        beforeEnter (el) {
          const { $refs, $props } = el.__vkOffcanvas

          // run common transition actions
          events.beforeEnter(el)

          css(doc, 'overflowY', scrollbarWidth && $props.overlay
            ? 'scroll'
            : ''
          )

          addClass($refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide')
        },
        enter (el, done) {
          const { $refs } = el.__vkOffcanvas

          height(el) // force reflow
          addClass(el, 'uk-open')

          // indicate end of transition
          once(el, 'transitionend', done, false, e => e.target === $refs.bar)
        },
        afterEnter (el) {
          // run common transition actions
          events.afterEnter(el)
        },
        beforeLeave (el) {
          removeClass(el, 'uk-open')
        },
        leave (el, done) {
          const { $refs } = el.__vkOffcanvas

          // indicate end of transition
          once(el, 'transitionend', done, false, e => e.target === $refs.bar)
        },
        afterLeave (el) {
          const { $refs } = el.__vkOffcanvas

          removeClass($refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide')

          // run common transition actions
          events.afterLeave(el)
        }
      }
    }

    return h('transition', mergeData(def, data), children)
  }
}
