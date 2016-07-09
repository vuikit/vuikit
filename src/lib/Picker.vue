<template>
  <div>
    <table v-el:table></table>
  </div>
</template>

<script>
import Vue from 'vue'
import { isObject, reduce, merge } from 'lodash'
const Table = Vue.extend(require('./Table'))

// workaround for required props notice
// that arise when using manual instanciation
Table.options.props.fields.required = false
Table.options.props.rows.required = false

export default {
  compiled () {
    // init Table
    this.$table = new Table({
      parent: this,
      el: this.$els.table,
      _context: this,
      propsData: merge(this.table, {
        template:
          `<a href=""
            v-if="isPickable($field.name)"
            v-text="$row[$field.name]"
            @click.prevent="pick($field.name, $row)">
          </a>
          <span v-else>
            {{ $row[$field.name] }}
          </span>`
      })
    })
  },
  data () {
    return {
      show: false
    }
  },
  props: {
    // Array of pickable fields
    // eg: [{ id: 'name' }, 'hits']
    pickables: {
      type: Array,
      required: true
    },
    // table component options
    table: {
      type: Object,
      default: () => ({})
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
