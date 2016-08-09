<template>
  <div>
    <vk-table v-ref:table
      :fields="tableFields"
      :rows="tableRows"
      :condensed="tableCondensed"
      :striped="tableStriped"
      :hover="tableHover"
      :sort-order="tableSortOrder"
      @sort="$emit('table-sort', $arguments[0])">
      <a href=""
        v-if="isPickable($field.name)"
        v-text="$row[$field.name]"
        @click.prevent="pick($field.name, $row)">
      </a>
      <span v-else>
        {{ $row[$field.name] }}
      </span>
    </vk-table>
  </div>
</template>

<script>
import Table from './Table'
import { isObject, reduce, merge, mapKeys, upperFirst } from 'lodash'

export default {
  name: 'VkPicker',
  components: {
    VkTable: Table
  },
  props: merge({
    // Array of pickable fields
    // eg: [{ id: 'name' }, 'hits']
    pickables: {
      type: Array,
      required: true
    }
  }, // get and prefix subcomponent props
    mapKeys(Table.props, (value, key) => 'table' + upperFirst(key))
  ),
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
