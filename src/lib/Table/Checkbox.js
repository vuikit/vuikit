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
        click: e => {
          // ensure the browser doesnt apply
          // the checked state on click
          e.target.checked = props.checked
          // trigger any click event
          if (data.on && data.on.click) {
            data.on.click.call(this, e)
          }
        }
      }
    })
  }
}
