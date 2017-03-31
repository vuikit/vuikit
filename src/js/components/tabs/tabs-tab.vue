<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { warn } from 'src/js/util/index'

export default {
  name: 'VkTab',
  props: {
    label: String,
    alias: {
      type: [String, Number],
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created () {
    if (!this.disabled && !this.$slots.default) {
      warn(`[VkTabs]: content is missing in tab ${this.label}`)
    }
  }
}
</script>
