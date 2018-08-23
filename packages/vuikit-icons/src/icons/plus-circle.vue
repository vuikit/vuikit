<template functional>
  <svg
    version="1.1"
    meta="plus-circle"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <circle fill="none" stroke="#000" stroke-width="1.1" cx="9.5" cy="9.5" r="9" /><line fill="none" stroke="#000" x1="9.5" y1="5" x2="9.5" y2="14" /><line fill="none" stroke="#000" x1="5" y1="9.5" x2="14" y2="9.5" />
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
