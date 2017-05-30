<template>
  <th :class="{
    'uk-table-shrink': shrink,
    'uk-table-expand': expand
  }">
    {{ header }}
  </th>
</template>

<script>
import { get } from 'src/js/util/index'

export default {
  name: 'VkTableColumn',
  props: {
    header: {
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
    }
  },
  cellRender (h, row) {
    let scopedSlot = this.$scopedSlots.default
    let scopedArgs = [row]

    if (this.$scopedSlots.cellTemplate) {
      scopedSlot = this.$scopedSlots.cellTemplate
      scopedArgs = [h, row]
    }

    return h('td', {
      staticClass: this.cellClass
    }, [
      scopedSlot
        ? scopedSlot.call(this, ...scopedArgs)
        : get(row, this.cell, '')
    ])
  }
}
</script>
