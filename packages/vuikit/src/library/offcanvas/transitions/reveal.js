import { css } from 'vuikit/src/util/style'
import { once } from 'vuikit/src/util/event'
import { width, height } from 'vuikit/src/util/dimensions'
import { addClass, removeClass } from 'vuikit/src/util/class'
import { mergeData } from 'vuikit/src/util/vue'

import { events, scrollbarWidth, doc, win } from './_common'

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

          width($refs.content, width(win) - scrollbarWidth)

          css(doc, 'overflowY', $props.flipped && scrollbarWidth && $props.overlay
            ? 'scroll'
            : ''
          )
        },
        enter (el, done) {
          const { $refs } = el.__vkOffcanvas

          height(el) // force reflow
          addClass(el, 'uk-open')
          addClass($refs.content, 'uk-offcanvas-content-animation')

          // indicate end of transition
          once(el, 'transitionend', done, false, e => e.target === $refs.reveal)
        },
        afterEnter (el) {
          // run common transition actions
          events.afterEnter(el)
        },
        beforeLeave (el) {
          const { $refs } = el.__vkOffcanvas

          removeClass(el, 'uk-open')
          removeClass($refs.content, 'uk-offcanvas-content-animation')
        },
        leave (el, done) {
          const { $refs } = el.__vkOffcanvas

          // indicate end of transition
          once(el, 'transitionend', done, false, e => e.target === $refs.reveal)
        },
        afterLeave (el) {
          // run common transition actions
          events.afterLeave(el)
        }
      }
    }

    return h('transition', mergeData(def, data), children)
  }
}
