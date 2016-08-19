import { merge } from '../../util'

export default {
  functional: true,
  props: {
    row: {
      required: true
    },
    field: {
      required: true
    }
  },
  render (h, { parent, props }) {
    let customComponent = false
    if (parent.fieldComponent) {
      customComponent = h(parent.fieldComponent, {
        props: merge({}, parent.fieldProps, props)
      })
    }
    return customComponent || props.row[ props.field.name ]
  }
}
