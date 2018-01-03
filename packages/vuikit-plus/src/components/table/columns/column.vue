<template>
  <column-head
    :class="['vk-table-column', headClass]"
    :shrinked="shrinked"
    :expanded="expanded"
  >
    <slot name="head">{{ head }}</slot>
  </column-head>
</template>

<script>
import ColumnHead from './ui/head'
import { get, isUndefined } from '@vuikit/core/util'
import mergeData from '@vuikit/core/helpers/vue-data-merge'

export default {
  name: 'TableColumn',
  components: {
    ColumnHead
  },
  props: mergeData({}, ColumnHead.props, {
    head: {
      type: String
    },
    headClass: {
      type: String
    },
    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  }),
  cellRender: (h, { props, parent, data }) => {
    const { row, cell, cellClass } = props
    const { scopedSlots } = data

    const cellValue = get(row, cell)

    // support custom slots, fallback to default fn
    const cellSlot = scopedSlots.cell || (() => cellValue)
    const emptySlot = scopedSlots.emptyCell || (() => '')

    return h('td', {
      class: cellClass
    }, [
      isUndefined(cellValue)
        ? emptySlot(row)
        : cellSlot(cellValue, row)
    ])
  }
}
</script>
