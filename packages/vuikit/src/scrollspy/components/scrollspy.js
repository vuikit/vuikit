/* eslint-disable no-mixed-operators */
import { $$ } from 'vuikit/src/_core/utils/core'
import { css } from 'vuikit/src/_core/utils/style'
import { data } from 'vuikit/src/_core/utils/attr'
import { warn } from 'vuikit/src/_core/utils/debug'
import { filter } from 'vuikit/src/_core/utils/filter'
import { trigger } from 'vuikit/src/_core/utils/event'
import { isInView } from 'vuikit/src/_core/utils/dimensions'
import { filterOutTextNodes } from 'vuikit/src/_core/utils/vue'
import { addClass, removeClass, toggleClass } from 'vuikit/src/_core/utils/class'

import MixinEvents from 'vuikit/src/_core/mixins/events'
import MixinFastdom from 'vuikit/src/_core/mixins/fastdom'

export default {
  abstract: true,
  mixins: [MixinEvents, MixinFastdom],
  props: {
    cls: {
      type: Array,
      default: () => []
    },
    target: {
      default: false
    },
    hidden: {
      type: Boolean,
      default: true
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetLeft: {
      type: Number,
      default: 0
    },
    repeat: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  classMapping: {
    inViewClass: 'uk-scrollspy-inview'
  },
  computed: {
    elements () {
      return this.target ? $$(this.target, this.$el) : [ this.$el ]
    }
  },
  fastdom: [
    {
      write () {
        const { inViewClass } = this.$options.classMapping

        if (this.hidden) {
          css(filter(this.elements, `:not(.${inViewClass})`), 'visibility', 'hidden')
        }
      }
    },
    {
      read (els) {
        this.elements.forEach((el, i) => {
          let elData = els[i]

          if (!elData || elData.el !== el) {
            const cls = data(el, 'vk-scrollspy-class')
            elData = {el, toggles: cls && cls.split(',') || this.cls}
          }

          elData.show = isInView(el, this.offsetTop, this.offsetLeft)
          els[i] = elData
        })
      },

      write (els) {
        const { inViewClass } = this.$options.classMapping

        let index = this.elements.length === 1 ? 1 : 0

        this.elements.forEach((el, i) => {
          const elData = els[i]
          const cls = elData.toggles[i] || elData.toggles[0]

          if (elData.show && !elData.inview && !elData.timer) {
            const show = () => {
              css(el, 'visibility', '')
              addClass(el, inViewClass)
              toggleClass(el, cls)

              trigger(el, 'inview')

              this.fastdomUpdate()

              elData.inview = true
              delete elData.timer
            }

            if (this.delay && index) {
              elData.timer = setTimeout(show, this.delay * index)
            } else {
              show()
            }

            index++
          } else if (!elData.show && elData.inview && this.repeat) {
            if (elData.timer) {
              clearTimeout(elData.timer)
              delete elData.timer
            }

            css(el, 'visibility', this.hidden ? 'hidden' : '')
            removeClass(el, inViewClass)
            toggleClass(el, cls)

            trigger(el, 'outview')

            this.fastdomUpdate()

            elData.inview = false
          }
        })
      },

      events: ['scroll', 'load', 'resize']
    }
  ],
  render (h) {
    let children = this.$slots.default

    if (!children) {
      return
    }

    children = filterOutTextNodes(children)

    if (!children.length) {
      return
    }

    // warn if using multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn('[VkScrollspy]: This component can only be applied to a single element', this.$parent)
    }

    return children[0]
  }
}
