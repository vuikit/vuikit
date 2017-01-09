export default {
  functional: true,
  props: ['checked'],
  render (h, { data, props }) {
    return h('input', {
      ...data,
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: {
        ...data.on,
        change: e => {
          // ensures checked state consistency
          e.target.checked = props.checked
        }
      }
    })
  }
}
