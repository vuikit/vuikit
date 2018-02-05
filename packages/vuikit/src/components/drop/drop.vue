<template>
  <div
    :style="$style"
    :class="['uk-drop', { 'uk-open': show }]"
    @mouseenter.self="triggerShow"
    @mouseleave.self="hideOnLeave && triggerHide()"
    v-position="{
      flip,
      target: $target,
      position: $position,
      boundary: $boundary,
      classPrefix: 'uk-drop'
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { isRtl } from 'vuikit/src/util/dom'
import { on, off } from 'vuikit/src/util/dom/event'
import Position from 'vuikit/src/core/v-position'
import { get, includes, isString } from 'vuikit/src/util/lang'

const positions = [
  'top-left',
  'top-center',
  'top-right',
  'top-justify',

  'bottom-left',
  'bottom-center',
  'bottom-right',
  'bottom-justify',

  'left-top',
  'left-center',
  'left-bottom',

  'right-top',
  'right-center',
  'right-bottom'
]

export default {
  name: 'Drop',
  directives: {
    Position
  },
  props: {
    // a Dom element to attach to
    target: {},
    // a Dom element as boundary
    boundary: {
      default: () => window
    },
    // a Dom element where to append the drop
    placement: {
      default: () => document.body
    },
    show: {
      type: Boolean,
      required: true
    },
    flip: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: `bottom-${isRtl() ? 'right' : 'left'}`,
      validator: pos => includes(positions, pos)
    },
    triggers: {
      type: String,
      default: 'hover focus'
    },
    showDelay: {
      type: Number,
      default: 0
    },
    hideDelay: {
      type: Number,
      default: 100
    },
    // determines if hide should be
    // trriggered on drop mouseleave
    hideOnLeave: {
      type: Boolean,
      default: true
    },
    // determines if hide should be
    // trriggered on click outside
    hideOnClick: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    $position () {
      return this.position.replace('justify', 'center')
    },
    $dir () {
      return this.position.split('-')[0]
    },
    $align () {
      return this.position.split('-')[1]
    },
    $style () {
      const style = {}
      const isJustified = this.$align === 'justify'

      if (!this.target || !isJustified) {
        return style
      }

      const rect = this.target.getBoundingClientRect()
      const prop = getPositionAxis(this.position) === 'y'
        ? 'width'
        : 'height'

      style[prop] = `${rect[prop]}px`

      return style
    },
    $target () {
      return isString(this.target)
        ? get(this.$vnode.context.$refs, this.target)
        : this.target
    },
    $boundary () {
      return isString(this.boundary)
        ? get(this.$vnode.context.$refs, this.boundary)
        : this.boundary
    },
    $placement () {
      return isString(this.placement)
        ? get(this.$vnode.context.$refs, this.placement)
        : this.placement
    }
  },
  watch: {
    triggers () {
      this.removeTargetEvents(this.target)
      this.setTargetEvents(this.target)
    },
    target (target, oldTarget) {
      this.removeTargetEvents(oldTarget)
      this.setTargetEvents()
    },
    show (val) {
      if (val && this.triggers.match(/click/) && this.hideOnClick) {
        // trigger events when clicked outside drop
        on(window.document, 'click', e => {
          const clickInside = this.$el.contains(e.target)

          if (clickInside) {
            return
          }

          this.triggerHide()
        }, this._uid)
      } else {
        off(window.document, 'click', this._uid)
      }
    }
  },
  methods: {
    removeTargetEvents (target) {
      if (!target) {
        return
      }

      off(target, 'click mouseenter mouseleave focusin focusout', this._uid)
    },
    setTargetEvents () {
      if (!this.$target) {
        return
      }

      if (this.triggers.match(/click/)) {
        on(this.$target, 'click', this.toggleShow, this._uid)
      }

      if (this.triggers.match(/hover/)) {
        on(this.$target, 'mouseenter', this.triggerShow, this._uid)
        on(this.$target, 'mouseleave', this.triggerHide, this._uid)
      }

      if (this.triggers.match(/focus/)) {
        on(this.$target, 'focusin', this.triggerShow, this._uid)
        on(this.$target, 'focusout', this.triggerHide, this._uid)
      }
    },
    triggerShow () {
      clearTimeout(this.hideTimeout)

      this.showTimeout = setTimeout(() => {
        this.$emit('update:show', true)
      }, this.showDelay)
    },
    triggerHide () {
      clearTimeout(this.showTimeout)

      this.hideTimeout = setTimeout(() => {
        this.$emit('update:show', false)
      }, this.hideDelay)
    },
    toggleShow () {
      this.show
        ? this.triggerHide()
        : this.triggerShow()
    }
  },
  mounted () {
    // placed in root to avoid being styled
    // from parent elements rules
    if (this.$placement) {
      this.$placement.appendChild(this.$el)
    }

    // set events
    this.setTargetEvents()
  },
  beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}

function getPositionAxis (position) {
  const [dir] = position.split('-')
  return dir === 'top' || dir === 'bottom'
    ? 'y'
    : 'x'
}
</script>
