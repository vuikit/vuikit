<template functional>
  <svg
    version="1.1"
    meta="sign-out"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <polygon points="13.1 13.4 12.5 12.8 15.28 10 8 10 8 9 15.28 9 12.5 6.2 13.1 5.62 17 9.5" /><polygon points="13 2 3 2 3 17 13 17 13 16 4 16 4 3 13 3" />
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
