<template>
  <th class="uk-form uk-text-center uk-table-shrink" :class="headerClass">
    <checkbox :checked="allSelected"
      @click="toggleAll">
    </checkbox>
  </th>
</template>

<script>
import Checkbox from './checkbox'
import { joinClasses } from '../util'

export default {
  name: 'VkTableColumnSelect',
  components: { Checkbox },
  props: {
    headerClass: {
      type: String
    },
    cellClass: {
      type: String
    },
    selection: {
      type: Array,
      default: []
    }
  },
  computed: {
    rows () {
      return this.$parent.data
    },
    selectedRows () {
      return this.rows.filter(this.isSelected)
    },
    allSelected () {
      return this.selectedRows.length && (this.selectedRows.length === this.rows.length)
    }
  },
  methods: {
    isSelected (row) {
      return this.selection.find(r => r.id === row.id)
    },
    select (row) {
      const newSelection = [...this.selection, row]
      this.$emit('update:selection', newSelection)
    },
    unselect (row) {
      const newSelection = [...this.selection]
      newSelection.splice(this.selection.indexOf(row), 1)
      this.$emit('update:selection', newSelection)
    },
    toggle (row) {
      this.isSelected(row)
        ? this.unselect(row)
        : this.select(row)
      this.$parent.$forceUpdate()
    },
    toggleAll () {
      this.$emit('update:selection', this.allSelected
        ? []
        : [...this.rows]
      )
    }
  },
  cellRender (h, row) {
    const defaultClasses = 'uk-form uk-text-center vk-table-width-minimum'

    return h('td', {
      staticClass: joinClasses(defaultClasses, this.cellClass)
    }, [
      h(Checkbox, {
        props: { checked: this.isSelected(row) },
        on: { click: e => this.toggle(row) }
      })
    ])
  }
}
</script>
