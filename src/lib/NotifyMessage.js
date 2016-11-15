export default {
  props: {
    id: {
      type: [Number, String, Object],
      default: 0
    },
    status: {
      type: String,
      default: '' // info, success, warning, danger
    },
    timeout: {
      type: Number,
      default: 5000
    },
    transition: {
      type: String,
      default: ''
    }
  },
  computed: {
    statusClass () {
      return 'uk-notify-message-' + this.status.replace('info', 'primary')
    }
  },
  render (h) {
    return (
      <transition name={ this.transition }>
        <div staticClass="uk-notify-message" class={{
          [this.statusClass]: this.status,
          'vk-notify-message-sticky': this.timeout === 0
        }} on-click={() => this.$parent.$emit('click', this.id)}>
          { this.$slots.default }
        </div>
      </transition>
    )
  },
  mounted () {
    if (this.timeout > 0) {
      setTimeout(() => {
        this.$parent.$emit('timeout', this.id)
      }, this.timeout)
    }
  }
}
