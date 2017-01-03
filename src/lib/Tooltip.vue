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
import { inArray } from 'src/helpers/util'

let onMouseenter
let onMouseleave

const PLACEMENT_MIRROR = {
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
    placementClass () {
      return `uk-tooltip-${this.convertPlacement(this.placement, this.fixed)}`
    },
    targetElement () {
      // defaults to originalParentEl which remains
      // even when the dom changes it ubication
      return this.target || this.$options._parentElm
    }
  },
  beforeUpdate () {
    // update popper
    this.$popper.options.placement = this.placement
    this.$popper.options.modifiers.offset.offset = this.offset
    this.$popper.update()
  },
  mounted () {
    // init popper
    this.$popper = new Popper(
      this.targetElement,
      this.$el,
      {
        placement: this.placement,
        modifiers: {
          offset: {
            offset: this.offset
          }
        },
        onCreate: data => { this.flipped = data.flipped },
        onUpdate: data => { this.flipped = data.flipped }
      }
    )

    // initially the tooltip is off document
    this.remove()

    onMouseenter = () => {
      document.body.appendChild(this.$el)
      this.active = true
      this.$emit('show')
    }

    onMouseleave = () => {
      this.active = false
      offAll(this.$el, this._uid)
      this.$emit('hide')
    }

    on(this.targetElement, 'mouseenter', onMouseenter, this._uid)
    on(this.targetElement, 'focus', onMouseenter, this._uid)
    on(this.targetElement, 'mouseleave', onMouseleave, this._uid)
    on(this.targetElement, 'blur', onMouseleave, this._uid)
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
    convertPlacement (placement, flipped = false) {
      placement = placement.split('-')
      if (flipped) {
        placement[0] = PLACEMENT_MIRROR[placement[0]]
      }
      if (placement[1]) {
        placement[1] = placement[1].replace('start', 'left').replace('end', 'right')
      }
      return placement[1] === undefined || inArray(['left', 'right'], placement[0])
        ? placement[0]
        : `${placement[0]}-${placement[1]}`
    }
  }
}
</script>
