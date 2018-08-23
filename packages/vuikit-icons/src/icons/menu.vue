<template functional>
  <svg
    version="1.1"
    meta="menu"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <rect x="2" y="4" width="16" height="1" /><rect x="2" y="9" width="16" height="1" /><rect x="2" y="14" width="16" height="1" />
  </svg>
</template>

<script>
export default {
  functional: true,
  props: {
    ratio: {
      type: [Number, String],
      default: 1
    },
    width: {
      default: 20
    },
    height: {
      default: 20
    },
    viewBox: {
      default: '0 0 20 20'
    }
  }
}
</script>
