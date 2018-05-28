import { css } from 'vuikit/src/_core/utils/style'
import { width } from 'vuikit/src/_core/utils/dimensions'
import { win, docEl } from 'vuikit/src/_core/utils/env'

import Core from '../core'
import { ElOffcanvas, ElOffcanvasBar } from '../elements'

import { SHOW, SHOWN, HIDE, HIDDEN } from '../constants'

export default {
  name: 'VkOffcanvas',
  extends: Core,
  render (h) {
    const instance = this

    // null the inherit class, use it on the bar el instead
    const inheritClass = this.$vnode.data.staticClass
    delete this.$vnode.data.staticClass

    const content = h(ElOffcanvas, {
      props: this.$props,
      class: {
        'uk-open': this.show
      },
      directives: [{
        name: 'show',
        value: this.show
      }]
    }, [
      h(ElOffcanvasBar, {
        class: [inheritClass, {
          'uk-offcanvas-none': this.show
        }],
        ref: 'bar'
      }, this.$slots.default)
    ])

    return h('transition', {
      props: { css: false },
      on: {
        enter: (el, done) => done(),
        leave: (el, done) => done(),
        beforeEnter (el) {
          instance.$emit(SHOW)

          const scrollbarWidth = width(win) - docEl.offsetWidth
          css(docEl, 'overflowY', scrollbarWidth && instance.overlay
            ? 'scroll'
            : ''
          )
        },
        afterEnter (el) {
          instance.$emit(SHOWN)
        },
        beforeLeave (el) {
          instance.$emit(HIDE)
        },
        afterLeave (el) {
          instance.$emit(HIDDEN)
        }
      }
    }, [ content ])
  }
}
