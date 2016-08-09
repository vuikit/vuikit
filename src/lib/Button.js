export default {
  name: 'VkButton',
  props: {
    value: {},
    type: {
      type: String,
      default: 'button'
    },
    ariaType: {
      type: String,
      default: 'pressed'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // class related
    color: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  render (h) {
    const data = {
      attrs: {
        [`aria-${this.ariaType}`]: `${this.active}`
      },
      class: {
        'uk-button': true,
        'uk-active': this.active,
        [`uk-width-${this.width}`]: this.width,
        /* color */
        'uk-button-primary': this.color === 'primary',
        'uk-button-success': this.color === 'success',
        'uk-button-danger': this.color === 'danger',
        'uk-button-link': this.color === 'link',
        /* size */
        'uk-button-mini': this.size === 'mini',
        'uk-button-small': this.size === 'small',
        'uk-button-large': this.size === 'large'
      }
    }
    return (
      <button type={ this.type } disabled={ this.disabled } {...data}>
        { this.$slots.default }
      </button>
    )
  }
}
