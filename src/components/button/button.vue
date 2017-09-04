<script>
export default {
  name: 'VkButton',
  functional: true,
  props: {
    value: {},
    type: {
      type: String,
      default: 'button'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, children, listeners }) {
    const { value, type, active, large, small, disabled } = props
    const { primary, secondary, danger, text, link } = props

    const data = {
      value,
      attrs: {
        type,
        disabled
      },
      on: {
        ...listeners
      },
      class: {
        'uk-active': active,
        'uk-button-default': !(primary || secondary || danger || text || link),
        'uk-button-primary': primary,
        'uk-button-secondary': secondary,
        'uk-button-danger': danger,
        'uk-button-text': text,
        'uk-button-link': link,
        'uk-button-large': large,
        'uk-button-small': small
      }
    }

    return <button class="uk-button" { ...data }>{ children }</button>
  }
}
</script>
