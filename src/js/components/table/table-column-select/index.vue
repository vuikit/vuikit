<template>
  <th class="uk-form uk-text-center uk-table-shrink" :class="headerClass">
    <checkbox :checked="allSelected"
      @click="toggleAll">
    </checkbox>
  </th>
</template>

<script>
import { warn } from 'src/js/util/index'
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
    }
  },
  computed: {
    selection () {
      return this.$parent.selection
    },
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
  created () {
    if (this.selection === undefined) {
      warn('Missing required prop: "selection"', this.$parent)
      this.$destroy()
    }
  },
  methods: {
    triggerUpdateEvent (selection) {
      this.$parent.$emit('update:selection', selection)
    },
    isSelected (row) {
      return this.selection.find(r => r.id === row.id)
    },
    select (row) {
      const newSelection = [...this.selection, row]
      this.triggerUpdateEvent(newSelection)
    },
    unselect (row) {
      const newSelection = [...this.selection]
      newSelection.splice(this.selection.indexOf(row), 1)
      this.triggerUpdateEvent(newSelection)
    },
    toggle (row) {
      this.isSelected(row)
        ? this.unselect(row)
        : this.select(row)
      this.$parent.$forceUpdate()
    },
    toggleAll () {
      this.triggerUpdateEvent(this.allSelected
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
