<template functional>
  <svg
    version="1.1"
    meta="arrow-left"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <polyline fill="none" stroke="#000" points="10 14 5 9.5 10 5" /><line fill="none" stroke="#000" x1="16" y1="9.5" x2="5" y2="9.52" />
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
