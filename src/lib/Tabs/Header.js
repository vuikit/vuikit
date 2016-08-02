export default {
  functional: true,
  render (h, { props }) {
    return (
      <li class={{
        ['uk-width-' + props.width]: props.width,
        'uk-disabled': props.disabled,
        'uk-active': props.active
      }}>
        <a href="">
          { props.label }
        </a>
      </li>
    )
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
