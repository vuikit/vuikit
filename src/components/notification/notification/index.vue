<template>
  <div class="uk-notification" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    position: {
      type: String,
      default: 'top-center' // (top|bottom)-(left|center|right)
    }
  },
  computed: {
    classes () {
      return `uk-notification-${this.position}`
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
