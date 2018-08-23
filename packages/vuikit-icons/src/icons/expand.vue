<template functional>
  <svg
    version="1.1"
    meta="expand"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <polygon points="13 2 18 2 18 7 17 7 17 3 13 3" /><polygon points="2 13 3 13 3 17 7 17 7 18 2 18" /><path fill="none" stroke="#000" stroke-width="1.1" d="M11,9 L17,3" /><path fill="none" stroke="#000" stroke-width="1.1" d="M3,17 L9,11" />
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
