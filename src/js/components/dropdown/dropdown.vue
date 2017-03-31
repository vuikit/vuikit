<template>
  <transition
    enter-to-class="uk-open"
    leave-class="uk-open"
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
    @after-enter="afterEnter">
    <div v-show="show" class="uk-dropdown" style="display: block;">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { on, offAll, addClass } from 'src/js/util/index'
import PopperMixin from 'lib/mixins/popper'

let onClickOut
let onMouseenter
let onTargetMouseenter
let onTargetMouseleave
let onClickTarget

export default {
  name: 'VkDropdown',
  mixins: [PopperMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    /* [top|right|bottom|left]-[left|center|right|justify] */
    position: {
      type: String,
      default: 'bottom-left'
    }
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
      if (this.targetElement.contains(e.fromElement)) {
        return
      }
      clearTimeout(leaveTimeout)
      this.$emit('mouseenter', { delay: delayFn }, e)
    }

    onTargetMouseenter = e => {
      // ignore childs triggers
      if (this.targetElement.contains(e.fromElement)) {
        return
      }
      clearTimeout(leaveTimeout)
      this.$emit('mouseenter', { delay: delayFn }, e)
    }

    onTargetMouseleave = e => {
      // ignore childs triggers
      if (e.relatedTarget === this.targetElement || e.relatedTarget === this.$el ||
        this.targetElement.contains(e.relatedTarget) || this.$el.contains(e.relatedTarget)
      ) {
        return
      }
      const delayFn = (time, cb) => { leaveTimeout = setTimeout(_ => cb(), time) }
      this.$emit('mouseleave', { delay: delayFn }, e)
    }

    onClickOut = e => {
      if (this.show) {
        // clicking target
        if (e.target === this.targetElement || this.targetElement.contains(e.target)) {
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
    on(this.targetElement, 'mouseenter', onTargetMouseenter, this._uid)
    on(this.targetElement, 'mouseleave', onTargetMouseleave, this._uid)
    on(this.targetElement, 'click', onClickTarget, this._uid)
    on(document, 'click', onClickOut, this._uid)
    if ('ontouchstart' in document.documentElement) {
      on(document, 'touchstart', onClickOut, this._uid)
    }
  },
  methods: {
    afterEnter () {
      addClass(this.$el, 'uk-open')
    },
    remove () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },
  beforeDestroy () {
    offAll(this._uid)
    this.remove()
  }
}
</script>
