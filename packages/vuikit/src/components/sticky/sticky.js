/* eslint-disable no-mixed-operators */
import { $ } from 'vuikit/src/util/core'
import { on } from 'vuikit/src/util/dom/event'
import { attr } from 'vuikit/src/util/attr'
import { warn } from 'vuikit/src/util/debug'
import { query } from 'vuikit/src/util/selector'
import { fastdom } from 'vuikit/src/util/fastdom'
import { Animation } from 'vuikit/src/util/animation'
import { after, remove } from 'vuikit/src/util/dom'
import { css, getCssVar } from 'vuikit/src/util/style'
import { within, isVisible } from 'vuikit/src/util/filter'
import { offset as offsetOf, height } from 'vuikit/src/util/dimensions'
import { assign, isNumeric, isString, toFloat, noop } from 'vuikit/src/util/lang'
import { hasClass, addClass, removeClass, toggleClass, replaceClass } from 'vuikit/src/util/class'

import { ACTIVE, INACTIVE } from './constants'
import MixinEvents from 'vuikit/src/mixins/events'

let scrollDir
let scroll = 0

on(window, 'scroll', () => {
  scrollDir = scroll < window.pageYOffset
    ? 'down'
    : 'up'
  scroll = window.pageYOffset
})

export default {
  name: 'VkSticky',
  abstract: true,
  mixins: [MixinEvents],
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
    updateOnLoadAndResize () {
      this.updatePlaceholder()
      this.updateWidthElement()

      this.topOffset = offsetOf(this.isActive ? this.$refs.placeholder : this.$el).top
      this.bottomOffset = this.topOffset + this.outerHeight

      const top = parseProp('top', this)
      const bottom = parseProp('bottom', this)

      this.stickAt = Math.max(toFloat(top), this.topOffset) - this.offset
      this.stickUntil = bottom && bottom - this.outerHeight
      this.inactive = this.media && !window.matchMedia(toMedia(this.media)).matches

      if (this.isActive) {
        this.update()
      }
    },
    ready () {
      if (!(this.target && location.hash && window.pageYOffset > 0)) {
        return
      }

      const target = $(location.hash)

      if (target) {
        fastdom.read(() => {
          const { top } = offsetOf(target)
          const elTop = offsetOf(this.$el).top
          const elHeight = this.$el.offsetHeight

          if (elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
            window.scrollTo(0, top - elHeight - this.target - this.offset)
          }
        })
      }
    },
    onScroll () {
      const visible = isVisible(this.$el)

      // place the logic into descriptive variables
      const isHidden = !visible
      const {bottomOffset, topOffset, stickAt} = this
      const {showOnUp, disabled, isActive, inactive, animation} = this

      // this one os confusing, in what situation
      // a scroll could be less than 0?
      const noScroll = scroll < 0

      if (noScroll || isHidden || disabled || (showOnUp && !scrollDir)) {
        return
      }

      const scrollingUp = scrollDir === 'up'
      const scrollingDown = scrollDir === 'down'
      const stickAtReached = scroll <= stickAt
      const stickAtNotReached = scroll < stickAt
      const bottomOffsetReached = scroll <= bottomOffset

      // the condition is still long and
      // the entire logic could be refactored
      if (inactive || stickAtNotReached || showOnUp &&
        (stickAtReached || scrollingDown ||
          (scrollingUp && !isActive && bottomOffsetReached)
        )
      ) {
        if (!isActive) {
          return
        }

        this.isActive = false

        if (animation && scroll > topOffset) {
          Animation.cancel(this.$el)
          Animation.out(this.$el, `uk-animation-${animation}`).then(() => this.hide(), noop)
        } else {
          this.hide()
        }
      } else if (isActive) {
        this.update()
      } else if (animation) {
        Animation.cancel(this.$el)
        this.show()
        Animation.in(this.$el, `uk-animation-${animation}`).catch(noop)
      } else {
        this.show()
      }
    },
    update () {
      const { clsFixed, clsBelow, clsActive } = this.$options.classMapping

      let top = Math.max(0, this.offset)
      const active = this.stickAt !== 0 || scroll > this.stickAt

      if (this.stickUntil && scroll > this.stickUntil - this.offset) {
        top = this.stickUntil - scroll
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

      toggleClass(this.$el, clsBelow, scroll > this.bottomOffset)
      addClass(this.$el, clsFixed)
    },
    updatePlaceholder () {
      css(this.$refs.placeholder, assign(
        { height: css(this.$el, 'position') !== 'absolute' ? this.outerHeight : '' },
        css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
      ))

      if (!within(this.$refs.placeholder, window.document)) {
        after(this.$el, this.$refs.placeholder)
        attr(this.$refs.placeholder, 'hidden', '')
      }
    },
    updateWidthElement () {
      attr(this.$refs.widthElement, 'hidden', null)
      this.width = this.$refs.widthElement.offsetWidth
      attr(this.$refs.widthElement, 'hidden', this.isActive ? null : '')
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

    // delay execution with setTimeout as
    // to wait for possible directives execution
    this.$nextTick(() => setTimeout(() => {
      this.ready()
      this.updateOnLoadAndResize()
      this.onScroll()
    }, 0))

    this.on(window, 'scroll', this.onScroll)
    this.on(window, 'resize', this.updateOnLoadAndResize)
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

    // filter out text nodes (possible whitespaces)
    children = children.filter(n => n.tag || isAsyncPlaceholder(n))

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

  const value = $props[prop]

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
      return offsetOf(el).top + el.offsetHeight
    }

  }
}

export function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

function toMedia (value) {
  if (isString(value)) {
    if (value[0] === '@') {
      const name = `media-${value.substr(1)}`
      value = toFloat(getCssVar(name))
    } else if (isNaN(value)) {
      return value
    }
  }

  return value && !isNaN(value) ? `(min-width: ${value}px)` : false
}
