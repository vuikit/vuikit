<template functional>
  <svg
    version="1.1"
    meta="close"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <path fill="none" stroke="#000" stroke-width="1.06" d="M16,16 L4,4" /><path fill="none" stroke="#000" stroke-width="1.06" d="M16,4 L4,16" />
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
