<template>
  <div><slot /></div>
</template>

<script>
export default {
  name: 'TabItem',
  props: {
    name: {
      type: String,
      required: true
    },
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
