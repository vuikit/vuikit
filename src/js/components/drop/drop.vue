<template>
  <div v-show="show"
    class="uk-drop"
    :class="{
      'uk-open': show,
      'uk-drop-boundary': boundaryAlign,
      [`uk-drop-${position}`]: show,
      [`uk-drop-${dir}-${align}`]: offset === false
    }"
    :style="{
      'top': `${top}px`,
      'left': `${left}px`
    }">
    <slot></slot>
  </div>
</template>

<script>
import { isRtl, on, offAll, getDimensions } from 'src/js/util/index'
import PositionMixin from 'lib/mixins/position'

let onClickOut
let onMouseenter
let onTargetMouseenter
let onTargetMouseleave
let onClickTarget

export default {
  name: 'VkDrop',
  mixins: [PositionMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    targetRef: {
      type: String
      // defaults to previousElementSibling
    },
    boundaryRef: {
      default: () => window
    },
    boundaryAlign: {
      type: Boolean,
      default: false
    },
    /* [top|right|bottom|left]-[left|center|right] */
    position: {
      type: String,
      default: !isRtl
        ? 'bottom-left'
        : 'bottom-right'
    }
  },
  data: () => ({
    clsPos: 'uk-drop'
  }),
  computed: {
    $target () {
      return this.getRefElement(this.targetRef) || this.$el.previousElementSibling
    },
    $boundary () {
      return this.getRefElement(this.boundaryRef) || window
    }
  },
  methods: {
    getRefElement (ref) {
      const context = this.$vnode.context
      const target = context.$refs[ref]
      if (target) {
        return target._isVue
          ? target.$el
          : target
      }
      return false
    },
    doPosition () {
      this.top = ''
      this.left = ''

      var boundary = getDimensions(this.$boundary)
      var alignTo = this.boundaryAlign
        ? boundary
        : getDimensions(this.$target)

      if (this.align === 'justify') {
        const prop = this.getAxis() === 'y'
          ? 'width'
          : 'height'
        this.$el.style[prop] = alignTo[prop] + 'px'
      } else if (this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
        // el.addClass(`uk-drop-stack`)
        // el.trigger('stack', [this])
      }

      this.$nextTick(() =>
        this.positionAt(
          this.$el,
          this.boundaryAlign
            ? this.$boundary
            : this.$target,
          this.$boundary
        )
      )
    }
  },
  watch: {
    show () {
      this.doPosition()
    }
  },
  init () {
    // this.tracker = new MouseTracker();
  },
  mounted () {
    let leaveTimeout
    // prepare delay helper function
    const delayFn = (time, cb) => {
      setTimeout(_ => cb(), time)
    }

    onClickTarget = e => {
      this.$emit('click-target', e)
    }

    onMouseenter = e => {
      // ignore childs triggers
      if (this.$target.contains(e.fromElement)) {
        return
      }
      clearTimeout(leaveTimeout)
      this.$emit('mouseenter', { delay: delayFn }, e)
    }

    onTargetMouseenter = e => {
      if (this.$target.contains(e.fromElement)) {
        return
      }
      clearTimeout(leaveTimeout)
      if (this.show) {
        return
      }
      this.$emit('mouseenter', { delay: delayFn }, e)
      // return Animation.in(this.$el, this.animation[0], this.duration, this.origin);
      // Animation.in(this.$el, 'uk-animation-fade', 200, false)
    }

    onTargetMouseleave = e => {
      // ignore childs triggers
      if (e.relatedTarget === this.$target || e.relatedTarget === this.$el ||
        this.$target.contains(e.relatedTarget) || this.$el.contains(e.relatedTarget)
      ) {
        return
      }
      const delayFn = (time, cb) => { leaveTimeout = setTimeout(_ => cb(), time) }
      this.$emit('mouseleave', { delay: delayFn }, e)
    }

    onClickOut = e => {
      if (this.show) {
        // clicking target
        if (e.target === this.$target || this.$target.contains(e.target)) {
          return
        }
        // click in/out dropdown
        if (e.target === this.$el || this.$el.contains(e.target)) {
          this.$emit('click-in', e)
        } else {
          this.$emit('click-out', e)
        }
      }
    }

    on(this.$el, 'mouseleave', onTargetMouseleave, this._uid)
    on(this.$el, 'mouseenter', onMouseenter, this._uid)
    on(this.$target, 'mouseenter', onTargetMouseenter, this._uid)
    on(this.$target, 'mouseleave', onTargetMouseleave, this._uid)
    on(this.$target, 'click', onClickTarget, this._uid)
    on(document, 'click', onClickOut, this._uid)
    if ('ontouchstart' in document.documentElement) {
      on(document, 'touchstart', onClickOut, this._uid)
    }
  },
  beforeDestroy () {
    offAll(this._uid)
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
