export default {
  name: 'VkSubnavItem',
  props: {
    index: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    active () {
      return this.index === this.$parent.index
    }
  },
  render (h) {
    return (
      <li class={{
        'uk-active': this.active,
        'uk-disabled': this.disabled
      }}>
        <a on-click={event => {
          event.preventDefault()
          if (!this.disabled && !this.active) {
            this.$parent.$emit('change', this.index)
          }
        }}>
          { this.$slots.default }
        </a>
      </li>
    )
  }
}
