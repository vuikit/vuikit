<template functional>
  <svg
    version="1.1"
    meta="vk-icons-spinner"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <circle fill="none" stroke="#000" cx="15" cy="15" r="14"/>
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
      default: 30
    },
    height: {
      default: 30
    },
    viewBox: {
      default: '0 0 30 30'
    }
  }
}
</script>
