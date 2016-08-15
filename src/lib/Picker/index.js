import { isObject, reduce, merge } from 'lodash'
import render from './render'

export default {
  name: 'VkPicker',
  render,
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
