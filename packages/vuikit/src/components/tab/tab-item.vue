<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  name: 'TabItem',
  props: {
    name: {},
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
