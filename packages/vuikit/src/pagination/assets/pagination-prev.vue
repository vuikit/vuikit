<template functional>
  <svg
    version="1.1"
    meta="pagination-prev"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <path fill="none" stroke="#000" stroke-width="1.2" d="M6 1L1 6l5 5"/>
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
      default: 7
    },
    height: {
      default: 12
    },
    viewBox: {
      default: '0 0 7 12'
    }
  }
}
</script>
