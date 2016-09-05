export default {
  functional: true,
  props: ['row', 'field'],
  render (h, { parent, props, data }) {
    // each field could provide its own render
    if (props.field.render !== undefined) {
      return h({
        functional: true,
        props: ['row', 'field'],
        render: props.field.render
      }, {
        props: {
          row: props.row,
          field: props.field
        }
      })
    } else {
      return props.row[ props.field.name ]
    }
  }
}
