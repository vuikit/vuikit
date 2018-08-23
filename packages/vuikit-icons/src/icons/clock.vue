<template functional>
  <svg
    version="1.1"
    meta="clock"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <circle fill="none" stroke="#000" stroke-width="1.1" cx="10" cy="10" r="9" /><rect x="9" y="4" width="1" height="7" /><path fill="none" stroke="#000" stroke-width="1.1" d="M13.018,14.197 L9.445,10.625" />
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
