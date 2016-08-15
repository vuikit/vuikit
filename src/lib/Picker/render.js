import { warn } from '../../util'

export default function (h) {
  if (this.$slots.default !== undefined) {
    const tableVnode = this.$slots.default[0]
    tableVnode.componentOptions.propsData.fieldComponent = RowField
    tableVnode.componentOptions.propsData.fieldProps = {
      $picker: this
    }
    return tableVnode
  } else {
    warn('VkPicker expects VkTable as child.')
  }
}

const RowField = {
  name: 'RowField',
  functional: true,
  props: {
    row: {
      required: true
    },
    field: {
      required: true
    },
    $picker: {
      required: true
    }
  },
  render (h, { parent: $calendar, props }) {
    const $picker = props.$picker
    if ($picker.isPickable(props.field.name)) {
      return h('a', {
        on: {
          click: e => {
            e.preventDefault()
            $picker.pick(props.field.name, props.row)
          }
        }
      }, [ props.row[props.field.name] ])
    } else {
      return h('span', [ props.row[props.field.name] ])
    }
  }
}
