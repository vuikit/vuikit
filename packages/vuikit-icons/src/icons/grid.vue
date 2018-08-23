<template functional>
  <svg
    version="1.1"
    meta="grid"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <rect x="2" y="2" width="3" height="3" /><rect x="8" y="2" width="3" height="3" /><rect x="14" y="2" width="3" height="3" /><rect x="2" y="8" width="3" height="3" /><rect x="8" y="8" width="3" height="3" /><rect x="14" y="8" width="3" height="3" /><rect x="2" y="14" width="3" height="3" /><rect x="8" y="14" width="3" height="3" /><rect x="14" y="14" width="3" height="3" />
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
