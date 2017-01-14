<template>
  <div class="uk-notify" :class="[`uk-notify-${placement}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VkNotify',
  props: {
    placement: {
      type: String,
      default: 'top-center' // (top|bottom)-(left|center|right)
    }
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el)
    }
  }
}
</script>
