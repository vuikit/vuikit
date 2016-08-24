export default {
  functional: true,
  props: ['checked', 'onClick'],
  render (h, { parent, props }) {
    return h('input', {
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: {
        click: e => {
          // ensure the browser doesnt apply
          // the checked state on click
          e.target.checked = props.checked
          props.onClick()
        }
      }
    })
  }
}
