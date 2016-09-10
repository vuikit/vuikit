export default {
  name: 'VkTabsItem',
  props: {
    index: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
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
        ['uk-width-' + this.width]: this.width,
        'uk-active': this.active,
        'uk-disabled': this.disabled
      }}>
        <a on-click={event => {
          event.preventDefault()
          if (!this.disabled) {
            this.$parent.$emit('change', this.index)
          }
        }}>
          { this.name }
        </a>
      </li>
    )
  }
}
