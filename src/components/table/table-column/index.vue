<template>
  <th :class="[headerClass, {
    'uk-table-shrink': shrink,
    'uk-table-expand': expand
  }]">
    <slot name="header">{{ header }}</slot>
  </th>
</template>

<script>
import { get } from '@vuikit/util'

export default {
  name: 'TableColumn',
  props: {
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    cell: {
      type: String
    },
    cellClass: {
      type: String
    },
    shrink: {
      type: Boolean,
      default: false
    },
    expand: {
      type: Boolean,
      default: false
    },
    // when using TableColumns the group
    // name will be provided as prop
    columnGroup: {
      type: String
    }
  },
  cellRender: (h, { row, col }) => {
    const rowSlot = get(col, 'data.scopedSlots.default')
    const props = get(col, 'componentOptions.propsData')

    return h('td', {
      class: props.cellClass,
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
        : get(row, props.cell, props.cell)
    ])
  }
}
</script>
