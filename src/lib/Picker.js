import { warn } from '../util'
import { isObject, reduce, merge } from 'lodash'

export default {
  name: 'VkPicker',
  props: {
    // Array of pickable fields
    // eg: [{ id: 'name' }, 'hits']
    pickables: {
      type: Array,
      required: true
    }
  },
  render (h) {
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
  },
  computed: {
    // returns a field/data pickables map
    pickablesMap () {
      return reduce(this.pickables, (result, value) => {
        if (isObject(value)) {
          merge(result, value)
        } else {
          result[value] = value
        }
        return result
      }, {})
    }
  },
  methods: {
    isPickable (field) {
      return Object.keys(this.pickablesMap).indexOf(field) !== -1
    },
    pick (field, row) {
      const data = row[this.pickablesMap[field]]
      this.$emit('pick', data, field)
    }
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
