<template functional>
  <svg
    version="1.1"
    meta="thumbnails"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <rect fill="none" stroke="#000" x="3.5" y="3.5" width="5" height="5" /><rect fill="none" stroke="#000" x="11.5" y="3.5" width="5" height="5" /><rect fill="none" stroke="#000" x="11.5" y="11.5" width="5" height="5" /><rect fill="none" stroke="#000" x="3.5" y="11.5" width="5" height="5" />
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
