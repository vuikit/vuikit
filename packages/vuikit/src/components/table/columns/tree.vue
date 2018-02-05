<script>
import Column from '../columns/column'
import TreeArrow from './ui/tree-arrow'
import TreeIndent from './ui/tree-indent'

import { get, isUndefined } from 'vuikit/src/util/lang'

export default {
  name: 'TableTreeColumn',
  extends: Column,
  cellRender: (h, { data, props, parent }) => {
    const { row, cell, cellClass, shrinked, expanded } = props
    const { scopedSlots } = data

    const cellValue = get(row, cell)

    const defaultSlotRender = () => [
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
    ]

    // support custom slots, fallback to default fn
    const cellSlot = scopedSlots.cell || defaultSlotRender
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
