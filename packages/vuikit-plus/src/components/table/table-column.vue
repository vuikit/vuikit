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
import get from '@vuikit/core/utils/get'
import ColumnHead from './ui/column-head'
import mergeData from '@vuikit/core/helpers/fn-data-merge'

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
  cellRender: (h, { props, data }) => {
    const { row, col, cell, cellClass } = props

    const def = get(row, cell, cell) // cell could be a path
    const slot = get(col, 'data.scopedSlots.default')

    return h('td', {
      class: cellClass,
      on: {
        click: e => {
          const instance = col.componentInstance
          const isCell = e => e.target.tagName === 'TD'
          isCell(e) && instance && instance.$emit('click-cell', row, cell)
        }
      }
    }, [
      (slot && slot(row)) || def
    ])
  }
}
</script>
