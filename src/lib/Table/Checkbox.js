export default {
  functional: true,
  props: ['checked', 'onChange'],
  render (h, { parent, props }) {
    return h('input', {
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: {
        change: props.onChange
      }
    })
  }
}
