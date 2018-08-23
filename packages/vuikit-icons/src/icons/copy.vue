<template functional>
  <svg
    version="1.1"
    meta="copy"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <rect fill="none" stroke="#000" x="3.5" y="2.5" width="12" height="16" /><polyline fill="none" stroke="#000" points="5 0.5 17.5 0.5 17.5 17" />
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
