<template functional>
  <svg
    version="1.1"
    meta="laptop"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <rect y="16" width="20" height="1" /><rect fill="none" stroke="#000" x="2.5" y="4.5" width="15" height="10" />
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
