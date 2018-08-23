<template functional>
  <svg
    version="1.1"
    meta="table"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <rect x="1" y="3" width="18" height="1" /><rect x="1" y="7" width="18" height="1" /><rect x="1" y="11" width="18" height="1" /><rect x="1" y="15" width="18" height="1" />
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
