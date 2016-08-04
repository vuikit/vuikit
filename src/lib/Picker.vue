<script>
import { warn } from '../util'
import { isObject, reduce, merge } from 'lodash'

export default {
  name: 'VkPicker',
  render (h) {
    if (this.$slots.default !== undefined) {
      const tableVnode = this.$slots.default[0]
      tableVnode.componentOptions.children = () => [
        h('PickField', {
          props: {
            row: tableVnode.child.$renderingRow,
            field: tableVnode.child.$renderingField,
            $picker: this
          }
        })
      ]
      return tableVnode
    } else {
      warn('VkPicker expects VkTable as child.')
    }
  },
  components: {
    PickField: {
      functional: true,
      props: ['row', 'field', '$picker'],
      render (h, { props }) {
        const $picker = props.$picker
        return ($picker.isPickable(props.field.name))
          ? (<a href=""
            v-text=""
            on-click={e => {
              e.preventDefault()
              $picker.pick(props.field.name, props.row)
            }}>
            { props.row[ props.field.name ] }
          </a>)
          : (<span>
            { props.row[ props.field.name ] }
          </span>)
      }
    }
  },
  props: {
    // Array of pickable fields
    // eg: [{ id: 'name' }, 'hits']
    pickables: {
      type: Array,
      required: true
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
</script>
