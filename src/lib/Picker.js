import { each, isString } from '../helpers/util'

export default {
  name: 'VkPicker',
  render: function (h) {
    return (
      <vk-table
        track-by="id"
        fields={ this.tableFields }
        rows={ this.rows }>
      </vk-table>
    )
  },
  props: {
    fields: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  },
  computed: {
    tableFields () {
      // override pickable fields render
      return this.fields.map(field => {
        if (field.pickable) {
          field.render = pickableRender
        }
        return field
      })
    },
    pickables () {
      const pickables = {}
      each(this.fields, field => {
        if (field.pickable && isString(field.pickable)) {
          pickables[field.name] = field.pickable
        } else if (field.pickable) {
          pickables[field.name] = field.name
        }
      })
      return pickables
    }
  }
}

const pickableRender = function (h, { props, parent }) {
  const vm = parent.$parent
  return (
    <a on-click={e => {
      const field = props.field.name
      const data = props.row[ vm.pickables[field] ]
      e.preventDefault()
      vm.$emit('pick', data, field)
    }}>
      { props.row[props.field.name] }
    </a>
  )
}
