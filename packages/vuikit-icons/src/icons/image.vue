<template functional>
  <svg
    version="1.1"
    meta="image"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <circle cx="16.1" cy="6.1" r="1.1" /><rect fill="none" stroke="#000" x="0.5" y="2.5" width="19" height="15" /><polyline fill="none" stroke="#000" stroke-width="1.01" points="4,13 8,9 13,14" /><polyline fill="none" stroke="#000" stroke-width="1.01" points="11,12 12.5,10.5 16,14" />
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
