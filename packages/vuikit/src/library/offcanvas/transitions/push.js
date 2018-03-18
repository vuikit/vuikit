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

          css(doc, 'overflowY', $props.flipped && scrollbarWidth && $props.overlay
            ? 'scroll'
            : ''
          )

          addClass($refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push')
        },
        enter (el, done) {
          const { $refs } = el.__vkOffcanvas

          height(el) // force reflow
          addClass(el, 'uk-open')
          addClass($refs.content, 'uk-offcanvas-content-animation')

          // indicate end of transition
          once(el, 'transitionend', done, false, e => e.target === $refs.bar)
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

          // save the ref before event end
          // as the vm will be deleted after
          const bar = $refs.bar
          // indicate end of transition
          once(el, 'transitionend', done, false, e => e.target === bar)
        },
        afterLeave (el) {
          const { $refs } = el.__vkOffcanvas

          removeClass($refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-push')

          // run common transition actions
          events.afterLeave(el)
        }
      }
    }

    return h('transition', mergeData(def, data), children)
  }
}
