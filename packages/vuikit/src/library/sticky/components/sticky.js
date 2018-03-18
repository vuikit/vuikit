/* eslint-disable no-mixed-operators */
import { $ } from 'vuikit/src/util/core'
import { css } from 'vuikit/src/util/style'
import { attr } from 'vuikit/src/util/attr'
import { warn } from 'vuikit/src/util/debug'
import { query } from 'vuikit/src/util/selector'
import { toMedia } from 'vuikit/src/util/misc'
import { fastdom } from 'vuikit/src/util/fastdom'
import { Animation } from 'vuikit/src/util/animation'
import { after, remove } from 'vuikit/src/util/dom'
import { within, isVisible } from 'vuikit/src/util/filter'
import { filterOutTextNodes } from 'vuikit/src/util/vue'
import { offset, height } from 'vuikit/src/util/dimensions'
import { assign, isNumeric, isString, toFloat, noop } from 'vuikit/src/util/lang'
import { hasClass, addClass, removeClass, toggleClass, replaceClass } from 'vuikit/src/util/class'

import MixinEvents from 'vuikit/src/mixins/events'
import MixinFastdom from 'vuikit/src/mixins/fastdom'

import { ACTIVE, INACTIVE } from '../constants'

export default {
  name: 'VkSticky',
  abstract: true,
  mixins: [MixinEvents, MixinFastdom],
  props: {
    top: {
      type: [Number, String],
      default: 0
    },
    bottom: {
      type: [Boolean, String],
      default: false
    },
    offset: {
      type: Number,
      default: 0
    },
    widthElement: {
      // dom ref
      default: false
    },
    animation: {
      type: String,
      default: ''
    },
    showOnUp: {
      type: Boolean,
      default: false
    },
    media: {
      type: [Number, String]
    },
    selTarget: {
      type: String
    },
    // Initially make sure that the Sticky is not
    // over a targeted element via location hash
    target: {
      type: [Number, Boolean],
      default: false
    }
  },
  classMapping: {
    clsFixed: 'uk-sticky-fixed',
    clsBelow: 'uk-sticky-below',
    clsActive: 'uk-active',
    clsInactive: ''
  },
  data: () => ({
    isActive: false
  }),
  computed: {
    outerHeight () {
      return (this.isActive ? this.$refs.placeholder : this.$el).offsetHeight
    },
    $selTarget () {
      return this.selTarget
        ? $(this.selTarget, this.$el)
        : this.$el
    }
  },
  fastdom: [
    {
      write () {

        const { placeholder, widthElement } = this.$refs
        const outerHeight = (this.isActive ? placeholder : this.$el).offsetHeight

        css(placeholder, assign(
          {height: css(this.$el, 'position') !== 'absolute' ? outerHeight : ''},
          css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
        ))

        if (!within(placeholder, document)) {
          after(this.$el, placeholder)
          attr(placeholder, 'hidden', '')
        }

        attr(widthElement, 'hidden', null)
        this.width = widthElement.offsetWidth
        attr(widthElement, 'hidden', this.isActive ? null : '')

        this.topOffset = offset(this.isActive ? placeholder : this.$el).top
        this.bottomOffset = this.topOffset + outerHeight

        const bottom = parseProp('bottom', this)

        this.stickAt = Math.max(toFloat(parseProp('top', this)), this.topOffset) - this.offset
        this.stickUntil = bottom && bottom - outerHeight
        this.inactive = this.media && !window.matchMedia(toMedia(this.media)).matches

        if (this.isActive) {
          this.update()
        }
      },

      events: ['load', 'resize']
    },
    {
      read (_, { scrollY = window.pageYOffset }) {
        this.scroll = scrollY

        return {
          scroll: scrollY,
          visible: isVisible(this.$el)
        }
      },
      write ({visible, scroll}, {dir} = {}) {

        if (scroll < 0 || !visible || this.disabled || this.showOnUp && !dir) {
          return
        }

        if (this.inactive ||
          scroll < this.stickAt ||
          this.showOnUp && (scroll <= this.stickAt || dir === 'down' || dir === 'up' && !this.isActive && scroll <= this.bottomOffset)
        ) {

          if (!this.isActive) {
            return
          }

          this.isActive = false

          if (this.animation && scroll > this.topOffset) {
            Animation.cancel(this.$el)
            Animation.out(this.$el, `uk-animation-${this.animation}`).then(() => this.hide(), noop)
          } else {
            this.hide()
          }

        } else if (this.isActive) {

          this.update()

        } else if (this.animation) {

          Animation.cancel(this.$el)
          this.show()
          Animation.in(this.$el, `uk-animation-${this.animation}`).catch(noop)

        } else {
          this.show()
        }
      },

      events: ['scroll']
    }
  ],
  methods: {
    show () {
      this.isActive = true
      this.update()
      attr(this.$refs.placeholder, 'hidden', null)
    },
    hide () {
      const { clsFixed, clsBelow, clsActive } = this.$options.classMapping

      if (!this.isActive || hasClass(this.$selTarget, clsActive)) {
        this.$emit(INACTIVE)
      }

      removeClass(this.$el, clsFixed, clsBelow)
      css(this.$el, { position: '', top: '', width: '' })
      attr(this.$refs.placeholder, 'hidden', '')
    },
    update () {
      const { clsFixed, clsBelow, clsActive } = this.$options.classMapping

      const active = this.stickAt !== 0 || this.scroll > this.stickAt
      let top = Math.max(0, this.offset)

      if (this.stickUntil && this.scroll > this.stickUntil - this.offset) {
        top = this.stickUntil - this.scroll
      }

      css(this.$el, {
        position: 'fixed',
        top: `${top}px`,
        width: this.width
      })

      if (hasClass(this.$selTarget, clsActive)) {

        if (!active) {
          this.$emit(INACTIVE)
        }

      } else if (active) {
        this.$emit(ACTIVE)
      }

      toggleClass(this.$el, clsBelow, this.scroll > this.bottomOffset)
      addClass(this.$el, clsFixed)
    }
  },
  created () {
    const { clsActive, clsInactive } = this.$options.classMapping

    this.$on(ACTIVE, () => replaceClass(this.$selTarget, clsInactive, clsActive))
    this.$on(INACTIVE, () => replaceClass(this.$selTarget, clsActive, clsInactive))
  },
  mounted () {
    addClass(this.$el, 'uk-sticky')

    this.$refs.placeholder = $('<div class="uk-sticky-placeholder"></div>')
    this.$refs.widthElement = (this.widthElement && query(this.widthElement)) || this.$refs.placeholder

    if (!this.isActive) {
      this.hide()
    }
  },
  domReady () {
    if (!(this.target && location.hash && window.pageYOffset > 0)) {
      return
    }

    const target = $(location.hash)

    if (target) {
      fastdom.read(() => {
        const { top } = offset(target)
        const elTop = offset(this.$el).top
        const elHeight = this.$el.offsetHeight

        if (elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
          window.scrollTo(0, top - elHeight - this.target - this.offset)
        }
      })
    }
  },
  beforeDestroy () {
    const { clsInactive } = this.$options.classMapping

    if (this.isActive) {
      this.isActive = false
      this.hide()
      removeClass(this.$selTarget, clsInactive)
    }

    remove(this.$refs.placeholder)
    this.$refs.placeholder = null
    this.$refs.widthElement = null
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
      warn('vk-sticky can only be used on a single element', this.$parent)
    }

    return children[0]
  }
}

function parseProp (prop, { $props, $el, [`${prop}Offset`]: propOffset }) {

  let value = $props[prop]

  // required coerce as the value can be both String and Boolean
  value = isString(value) && value === ''
    ? true
    : value

  if (!value) {
    return
  }

  if (isNumeric(value)) {

    return propOffset + toFloat(value)

  } else if (isString(value) && /^-?\d+vh$/.test(value)) {

    return height(window) * toFloat(value) / 100

  } else {

    const el = value === true ? $el.parentNode : query(value, $el)

    if (el) {
      return offset(el).top + el.offsetHeight
    }

  }
}
