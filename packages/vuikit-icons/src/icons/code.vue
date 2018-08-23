<template functional>
  <svg
    version="1.1"
    meta="code"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <polyline fill="none" stroke="#000" stroke-width="1.01" points="13,4 19,10 13,16" /><polyline fill="none" stroke="#000" stroke-width="1.01" points="7,4 1,10 7,16" />
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
