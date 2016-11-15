export default {
  name: 'VkNotify',
  props: {
    placement: {
      type: String,
      default: 'top-center' // (top|bottom)-(left|center|right)
    }
  },
  render (h) {
    return (
      <div class={ `uk-notify uk-notify-${this.placement}` }>
        { this.$slots.default }
      </div>
    )
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
