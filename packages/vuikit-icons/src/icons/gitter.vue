<template functional>
  <svg
    version="1.1"
    meta="gitter"
    :width="props.width * props.ratio"
    :height="props.height * props.ratio"
    :viewBox="props.viewBox"
  >
    <rect x="3.5" y="1" width="1.531" height="11.471" /><rect x="7.324" y="4.059" width="1.529" height="15.294" /><rect x="11.148" y="4.059" width="1.527" height="15.294" /><rect x="14.971" y="4.059" width="1.529" height="8.412" />
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
