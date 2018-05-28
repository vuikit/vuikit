import { once } from 'vuikit/src/_core/utils/event'
import { css } from 'vuikit/src/_core/utils/style'
import { win, docEl } from 'vuikit/src/_core/utils/env'
import { width, height } from 'vuikit/src/_core/utils/dimensions'
import { addClass, removeClass } from 'vuikit/src/_core/utils/class'

import Core from '../core'
import { ElOffcanvas, ElOffcanvasBar } from '../elements'

import { SHOW, SHOWN, HIDE, HIDDEN } from '../constants'

export default {
  name: 'VkOffcanvasSlide',
  extends: Core,
  render (h) {
    const instance = this

    // null the inherit class, use it on the bar el instead
    const inheritClass = this.$vnode.data.staticClass
    delete this.$vnode.data.staticClass

    const content = h(ElOffcanvas, {
      props: this.$props,
      directives: [{
        name: 'show',
        value: this.show
      }]
    }, [
      h(ElOffcanvasBar, {
        ref: 'bar',
        props: { animated: true },
        class: [inheritClass, 'uk-offcanvas-slide']
      }, this.$slots.default)
    ])

    return h('transition', {
      props: { css: false },
      on: {
        beforeEnter (el) {
          instance.$emit(SHOW)

          const scrollbarWidth = width(win) - docEl.offsetWidth
          css(docEl, 'overflowY', scrollbarWidth && instance.overlay
            ? 'scroll'
            : ''
          )
        },
        enter (el, done) {
          height(el) // force reflow
          addClass(el, 'uk-open')

          // indicate end of transition
          once(el, 'transitionend', done, false, e => e.target === instance.$refs.bar)
        },
        afterEnter (el) {
          instance.$emit(SHOWN)
        },
        beforeLeave (el) {
          instance.$emit(HIDE)
          removeClass(el, 'uk-open')
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
