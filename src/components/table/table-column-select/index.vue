<template>
  <th :class="['uk-form uk-text-center uk-table-shrink', headerClass]">
    <slot name="header">
      <checkbox
        :checked="allSelected"
        @click="toggleAll"
      ></checkbox>
    </slot>
  </th>
</template>

<script>
import Checkbox from './checkbox'
import get from '@vuikit/core/utils/get'
import cloneArray from '@vuikit/core/utils/clone-array'

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
    const rowSlot = get(col, 'data.scopedSlots.default')
    const props = get(col, 'componentOptions.propsData')

    return h('td', {
      class: ['uk-form uk-text-center', props.cellClass],
      on: {
        click: e => {
          const instance = col.componentInstance
          const isCell = e => e.target.tagName === 'TD'

          isCell(e) && instance && instance.$emit('click-cell', row, props.cell)
        }
      }
    }, [
      rowSlot
        ? rowSlot(row)
        : h(Checkbox, {
          props: {
            checked: table.isSelected(row)
          },
          on: {
            click: e => table.toggleSelection(row)
          }
        })
    ])
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
