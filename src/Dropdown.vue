<template>
  <transition :name="transition">
    <div v-show="show" :class="{
      'uk-dropdown': !blank,
      'uk-dropdown-blank': blank,
      'uk-dropdown-small': expand
    }">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Popper from 'popper.js'
import { on, offAll } from 'helpers/dom'

let onClick
let onTargetClick
let onTargetMouseenter
let onTargetMouseleave

export default {
  name: 'VkDropdown',
  props: {
    target: true,
    show: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom-start' // position[-start|-end]
    },
    modifiers: {
      type: Object,
      default: () => ({})
    },
    transition: {
      type: String,
      default: 'vk-dropdown-transition'
    },
    blank: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    flipped: false
  }),
  computed: {
    targetElement () {
      // defaults to originalParentEl which remains
      // even when the dom changes it ubication
      return this.target || this.$options._parentElm
    }
  },
  beforeUpdate () {
    // update popper
    this.$popper.options.placement = this.placement
    this.$popper.update()
  },
  mounted () {
    // move dom to body
    document.body.appendChild(this.$el)

    // init popper
    this.$popper = new Popper(
      this.targetElement,
      this.$el,
      {
        placement: this.placement,
        modifiers: this.modifiers,
        onCreate: data => { this.flipped = data.flipped },
        onUpdate: data => { this.flipped = data.flipped }
      }
    )

    onTargetClick = e => {
      this.$emit('targetClick', e)
    }

    onTargetMouseenter = e => {
      // ignore childs triggers
      if (this.targetElement.contains(e.fromElement)) {
        return
      }
      this.$emit('targetMouseenter', e)
    }

    onTargetMouseleave = e => {
      // ignore childs triggers
      if (e.relatedTarget === this.targetElement || this.targetElement.contains(e.relatedTarget)) {
        return
      }
      this.$emit('targetMouseleave', e)
    }

    onClick = e => {
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

    on(this.targetElement, 'mouseenter', onTargetMouseenter, this._uid)
    on(this.targetElement, 'mouseleave', onTargetMouseleave, this._uid)
    on(this.targetElement, 'click', onTargetClick, this._uid)
    on(document, 'click', onClick, this._uid)
    if ('ontouchstart' in document.documentElement) {
      on(document, 'touchstart', onClick, this._uid)
    }
  },
  methods: {
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
