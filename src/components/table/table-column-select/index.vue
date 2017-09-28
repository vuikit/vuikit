<template>
  <th class="uk-form uk-text-center uk-table-shrink" :class="headerClass">
    <checkbox :checked="$parent.isAllSelected"
      @click="toggleAll">
    </checkbox>
  </th>
</template>

<script>
import { warn } from '~/helpers/debug'
import Checkbox from './checkbox'

export default {
  name: 'TableColumnSelect',
  components: { Checkbox },
  props: {
    headerClass: {
      type: String
    },
    cellClass: {
      type: String
    }
  },
  methods: {
    toggleAll () {
      const selection = this.$parent.isAllSelected
        ? []
        : [...this.$parent.data]
      this.$parent.triggerUpdateEvent(selection)
    }
  },
  created () {
    if (this.$parent.selection === undefined) {
      warn('Missing required prop: "selection"', this.$parent)
      this.$destroy()
    }
  },
  cellRender (h, row) {
    return h('td', {
      class: ['uk-form uk-text-center', this.cellClass]
    }, [
      h(Checkbox, {
        props: { checked: this.$parent.isSelected(row) },
        on: { click: e => this.$parent.toggleSelection(row) }
      })
    ])
  }
}
</script>
