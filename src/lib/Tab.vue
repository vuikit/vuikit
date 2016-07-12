<template>
  <li><slot></slot></li>
</template>

<script>
export default {
  name: 'VkTab',
  props: {
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
