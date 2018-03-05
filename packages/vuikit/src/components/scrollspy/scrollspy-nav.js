/* eslint-disable no-mixed-operators */
import { warn } from 'vuikit/src/util/debug'
import { $, $$ } from 'vuikit/src/util/core'
import { filter } from 'vuikit/src/util/filter'
import { trigger } from 'vuikit/src/util/event'
import { closest } from 'vuikit/src/util/selector'
import { addClass, removeClass } from 'vuikit/src/util/class'
import { filterOutTextNodes } from 'vuikit/src/util/vue'
import { isInView, height, offset } from 'vuikit/src/util/dimensions'

import MixinEvents from 'vuikit/src/mixins/events'
import MixinFastdom from 'vuikit/src/mixins/fastdom'

export default {
  name: 'VkScrollspyNav',
  abstract: true,
  mixins: [MixinEvents, MixinFastdom],
  props: {
    cls: {
      type: String,
      default: 'uk-active'
    },
    closest: {
      type: String,
      default: ''
    },
    overflow: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  methods: {
    setComputed () {
      this.links = $$('a[href^="#"]', this.$el).filter(el => el.hash)
      this.elements = this.closest ? closest(this.links, this.closest) : this.links
      this.targets = $$(this.links.map(el => el.hash).join(','))
    }
  },
  fastdom: [
    {
      read (data) {
        const scroll = window.pageYOffset + this.offset + 1
        const max = height(document) - height(window) + this.offset

        data.active = false

        this.targets.every((el, i) => {

          const {top} = offset(el)
          const last = i + 1 === this.targets.length

          if (!this.overflow && (i === 0 && top > scroll || last && top + el.offsetTop < scroll)) {
            return false
          }

          if (!last && offset(this.targets[i + 1]).top <= scroll) {
            return true
          }

          if (scroll >= max) {
            for (let j = this.targets.length - 1; j > i; j--) {
              if (isInView(this.targets[j])) {
                el = this.targets[j]
                break
              }
            }
          }

          return !(data.active = $(filter(this.links, `[href="#${el.id}"]`)))
        })
      },
      write ({ active }) {
        this.links.forEach(el => el.blur())
        removeClass(this.elements, this.cls)

        if (active) {
          trigger(this.$el, 'active', [active, addClass(this.closest ? closest(active, this.closest) : active, this.cls)])
        }
      },

      events: ['scroll', 'load', 'resize']
    }
  ],
  mounted () {
    this.setComputed()
  },
  updated () {
    this.$nextTick(() => {
      this.setComputed()
      this.fastdomUpdate()
    })
  },
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
      warn('vk-scrollspy can only be used on a single element', this.$parent)
    }

    return children[0]
  }
}
