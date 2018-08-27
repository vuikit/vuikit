<template functional>
  <svg
    version="1.1"
    meta="close"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <path fill="none" stroke="#000" stroke-width="1.1" d="M1 1l12 12M13 1L1 13"/>
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
      default: 14
    },
    height: {
      default: 14
    },
    viewBox: {
      default: '0 0 14 14'
    }
  }
}
</script>
