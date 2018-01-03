<script>
import Column from '../columns/column'
import TreeArrow from './ui/column-arrow'
import TreeIndent from './ui/column-indent'

import { get } from '@vuikit/core/util'

export default {
  name: 'TableTreeColumn',
  extends: Column,
  cellRender: (h, { data, props, parent }) => {
    const { row, cell, cellClass } = props
    const { scopedSlots } = data

    const cellValue = get(row, cell)

    // support custom slots, fallback to default
    const cellSlot = scopedSlots.cell || ((cellValue, row) => [

      Array(row._vk_level).fill(h(TreeIndent)),

      parent.thereAreSubLevels && h(TreeIndent, [
        row._vk_childrenCount && h(TreeArrow, {
          props: {
            rotated: parent.isExpanded(row)
          },
          on: {
            click: e => {
              e._vk_row_click_prevented = true
              parent.toggleExpand(row)
            }
          }
        })
      ]),

      h('span', cellValue)

    ])

    const def = {
      class: cellClass
    }

    return h('td', def, cellSlot(cellValue, row))
  }
}
</script>
