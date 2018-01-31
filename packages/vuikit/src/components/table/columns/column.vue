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
import { get, isUndefined } from 'vuikit/core/util/lang'
import mergeData from 'vuikit/core/util/vue-data-merge'

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
  cellRender: (h, { props, data, parent }) => {
    const { row, cell, cellClass, shrinked, expanded } = props
    const { scopedSlots } = data

    const cellValue = get(row, cell)

    // support custom slots, fallback to default fn
    const cellSlot = scopedSlots.cell || (() => cellValue)
    const emptySlot = scopedSlots.emptyCell || (() => '')

    return h('td', {
      class: [cellClass, {
        'uk-table-shrink': !isUndefined(shrinked),
        'uk-table-expand': !isUndefined(expanded)
      }]
    }, [
      isUndefined(cellValue)
        ? emptySlot(row)
        : cellSlot(cellValue, row)
    ])
  }
}
</script>
