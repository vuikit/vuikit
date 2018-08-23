<template functional>
  <svg
    version="1.1"
    meta="download"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10" /><rect x="3" y="17" width="13" height="1" /><line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3" />
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
