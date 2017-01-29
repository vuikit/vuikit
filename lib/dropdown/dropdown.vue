<template>
  <transition
    enter-to-class="uk-open"
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
    leave-class="uk-open"
    @after-enter="afterEnter">
    <div v-show="show" class="uk-dropdown" style="display: block;">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { on, offAll, addClass } from 'helpers/dom'
import PopperMixin from 'lib/_mixins/popper.js'

let onClickOut
let onMouseenter
let onMouseleave
let onTargetClick

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
    // prepare delay helper function
    const delayFn = (time, cb) => {
      setTimeout(_ => cb(), time)
    }

    onTargetClick = e => {
      this.$emit('targetClick', e)
    }

    onMouseenter = e => {
      // ignore childs triggers
      if (this.targetElement.contains(e.fromElement)) {
        return
      }
      this.$emit('mouseenter', { delay: delayFn }, e)
    }

    onMouseleave = e => {
      // ignore childs triggers
      if (e.relatedTarget === this.targetElement || e.relatedTarget === this.$el ||
        this.targetElement.contains(e.relatedTarget) || this.$el.contains(e.relatedTarget)
      ) {
        return
      }
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
          this.$emit('clickIn', e)
        } else {
          this.$emit('clickOut', e)
        }
      }
    }

    on(this.$el, 'mouseleave', onMouseleave, this._uid)
    on(this.targetElement, 'mouseenter', onMouseenter, this._uid)
    on(this.targetElement, 'mouseleave', onMouseleave, this._uid)
    on(this.targetElement, 'click', onTargetClick, this._uid)
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
