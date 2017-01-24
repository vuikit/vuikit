<template>
  <div class="uk-notification" :class="[`uk-notification-${position}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VkNotification',
  props: {
    position: {
      type: String,
      default: 'top-center' // (top|bottom)-(left|center|right)
    }
  },
  mounted () {
    // move to body
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    if (this.$el.parentNode) {
      document.body.removeChild(this.$el)
    }
  }
}
</script>
