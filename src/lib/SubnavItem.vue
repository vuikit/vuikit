<template>
  <li :class="{
    'uk-active': active,
    'uk-disabled': disabled
  }">
    <a href="" @click.prevent="!disabled && ($parent.active = this)">
      <slot></slot>
    </a>
  </li>
</template>

<script>
export default {
  name: 'VkSubnavItem',
  created () {
    // set active
    if (this.active || !this.$parent.active) {
      this.$parent.active = this
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
