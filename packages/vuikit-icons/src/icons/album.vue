<template functional>
  <svg
    version="1.1"
    meta="album"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <rect x="5" y="2" width="10" height="1" /><rect x="3" y="4" width="14" height="1" /><rect fill="none" stroke="#000" x="1.5" y="6.5" width="17" height="11" />
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
