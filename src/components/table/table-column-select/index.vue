<template>
  <th :class="['uk-form uk-text-center uk-table-shrink', headerClass]">
    <checkbox
      :checked="allSelected"
      @click="toggleAll"
    ></checkbox>
  </th>
</template>

<script>
import Checkbox from './checkbox'
import { get, cloneArray } from '@vuikit/util'

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
  computed: {
    $table () {
      return this.$parent
    },
    allSelected () {
      return isAllSelected(this.$table.selection, this.$table.data)
    }
  },
  methods: {
    toggleAll () {
      const selection = this.allSelected
        ? []
        : cloneArray(this.$table.data)

      this.$table.updateSelection(selection)
    }
  },
  cellRender: (h, { row, col, table }) => {
    const props = get(col, 'componentOptions.propsData')

    return <td class={ ['uk-form uk-text-center', props.cellClass] }>
      <Checkbox
        checked={ table.isSelected(row) }
        onClick={ e => table.toggleSelection(row) }
      ></Checkbox>
    </td>
  }
}

function isSelected (selection, row) {
  return selection.findIndex(r => r.id === row.id) !== -1
}

function isAllSelected (selection, rows) {
  const ifSelected = row => isSelected(selection, row)
  const selected = rows.filter(ifSelected)

  if (selected.length === 0) {
    return false
  }

  return selected.length === rows.length
}
</script>
