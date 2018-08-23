<template functional>
  <svg
    version="1.1"
    meta="shrink"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <polygon points="11 4 12 4 12 8 16 8 16 9 11 9" /><polygon points="4 11 9 11 9 16 8 16 8 12 4 12" /><path fill="none" stroke="#000" stroke-width="1.1" d="M12,8 L18,2" /><path fill="none" stroke="#000" stroke-width="1.1" d="M2,18 L8,12" />
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
