import { once } from 'vuikit/src/_core/utils/event'
import { css } from 'vuikit/src/_core/utils/style'
import { win, docEl } from 'vuikit/src/_core/utils/env'
import { width, height } from 'vuikit/src/_core/utils/dimensions'
import { addClass, removeClass } from 'vuikit/src/_core/utils/class'

import Offcanvas from './offcanvas'
import { ElOffcanvas, ElOffcanvasBar } from '../elements'

import { SHOW, SHOWN, HIDE, HIDDEN } from '../constants'

export default {
  name: 'VkOffcanvasPush',
  extends: Offcanvas,
  data: () => ({
    open: false
  }),
  render (h) {
    const instance = this

    const content = h(ElOffcanvas, {
      props: this.$props,
      class: {
        'uk-open': this.open
      },
      directives: [{
        name: 'show',
        value: this.show
      }]
    }, [
      h(ElOffcanvasBar, {
        ref: 'bar',
        props: { animated: true },
        class: 'uk-offcanvas-push'
      }, this.$slots.default)
    ])

    return h('transition', {
      props: { css: false },
      on: {
        beforeEnter (el) {
          instance.$emit(SHOW)

          const scrollbarWidth = instance.getScrollbarWidth()

          css(docEl, 'overflowY', instance.flipped && scrollbarWidth && instance.overlay
            ? 'scroll'
            : ''
          )

          // freeze content width/height
          width(instance.$refs.content, width(win) - scrollbarWidth)
        },
        enter (el, done) {
          height(el) // force reflow
          instance.open = true
          addClass(instance.$refs.content, 'uk-offcanvas-content-animation')

          // indicate end of transition
          once(el, 'transitionend', done, false, e => e.target === instance.$refs.bar)
        },
        afterEnter (el) {
          instance.$emit(SHOWN)
        },
        beforeLeave (el) {
          instance.$emit(HIDE)
          instance.open = false
          removeClass(instance.$refs.content, 'uk-offcanvas-content-animation')
        },
        leave (el, done) {
          // indicate end of transition
          once(el, 'transitionend', done, false, e => e.target === instance.$refs.bar)
        },
        afterLeave (el) {
          instance.$emit(HIDDEN)
        }
      }
    }, [ content ])
  }
}
