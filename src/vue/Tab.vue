<template>
  <li><slot></slot></li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
