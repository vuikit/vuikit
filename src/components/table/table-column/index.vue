<template>
  <th :class="[headerClass, {
    'uk-table-shrink': shrink,
    'uk-table-expand': expand
  }]">
    {{ header }}
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
    const scopedSlot = get(col, 'data.scopedSlots.default')
    const props = get(col, 'componentOptions.propsData')

    return <td class={ props.cellClass }>
      { scopedSlot ? scopedSlot(row) : get(row, props.cell, props.cell) }
    </td>
  }
}
</script>
