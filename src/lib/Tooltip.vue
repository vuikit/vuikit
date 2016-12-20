<template>
  <transition :name="transition" @afterLeave="remove">
    <div v-show="active" class="uk-tooltip" :class="placementClass">
      <div class="uk-tooltip-inner" v-text="content" />
    </div>
  </transition>
</template>

<script>
import Popper from 'popper.js'
import { on, offAll } from 'src/helpers/dom'

let onMouseEnter
let onMouseLeave

const POSITION_MIRROR = {
  top: 'bottom',
  right: 'left',
  left: 'right',
  bottom: 'top'
}

export default {
  name: 'VkTooltip',
  props: {
    target: true,
    content: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'top'
    },
    offset: {
      type: String,
      default: '0 5'
    },
    transition: {
      type: String,
      default: 'vk-tooltip-transition'
    }
  },
  data: () => ({
    active: false,
    flipped: false
  }),
  computed: {
    popperOptions () {
      return {
        placement: this.placement,
        modifiers: {
          offset: {
            offset: this.offset
          }
        }
      }
    },
    placementClass () {
      return `uk-tooltip-${this.convertPlacement(this.placement, this.fixed)}`
    },
    targetElement () {
      // defaults to originalParentEl which remains
      // even when the dom changes it ubication
      return this.target || this.$options._parentElm
    }
  },
  mounted () {
    // initially the tooltip is off document
    this.remove()

    onMouseEnter = () => {
      document.body.appendChild(this.$el)
      this.active = true
      this.$emit('show')
      new Popper(this.targetElement, this.$el, this.popperOptions)
        .onCreate(data => { this.flipped = data.flipped })
        .onUpdate(data => { this.flipped = data.flipped })
    }

    onMouseLeave = () => {
      this.active = false
      offAll(this.$el, this._uid)
      this.$emit('hide')
    }

    on(this.targetElement, 'mouseenter', onMouseEnter, this._uid)
    on(this.targetElement, 'focus', onMouseEnter, this._uid)
    on(this.targetElement, 'mouseleave', onMouseLeave, this._uid)
    on(this.targetElement, 'blur', onMouseLeave, this._uid)
  },
  beforeDestroy () {
    if (this.targetElement) {
      offAll(this.targetElement, this._uid)
    }
    this.active = false
    this.remove()
  },
  methods: {
    remove () {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    convertPlacement (dirtyPlacement, flipped) {
      dirtyPlacement = dirtyPlacement.split('-')
      let placement = dirtyPlacement[0]
      if (flipped) {
        placement = POSITION_MIRROR[dirtyPlacement[0]]
      }
      if (dirtyPlacement[1]) {
        placement += '-' + dirtyPlacement[1]
          .replace('start', 'left')
          .replace('end', 'right')
      }
      return placement
    }
  }
}
</script>
