<template functional>
  <svg
    version="1.1"
    meta="desktop"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <rect x="8" y="15" width="1" height="2" /><rect x="11" y="15" width="1" height="2" /><rect x="5" y="16" width="10" height="1" /><rect fill="none" stroke="#000" x="1.5" y="3.5" width="17" height="11" />
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
