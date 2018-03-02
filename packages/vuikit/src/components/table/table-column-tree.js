import Column from './table-column'
import ElementTd from './elements/table-td'
import { get, isUndef, assign } from 'vuikit/src/util/lang'

import { ROW_LEVEL, ROW_CLICK_PREVENTED, ROW_CHILDREN_COUNT } from './constants'

const TreeArrow = {
  functional: true,
  props: ['rotated'],
  render: (h, { listeners, props }) =>
    h('span', {
      on: listeners,
      class: ['vk-table-column-tree__arrow', {
        'vk-table-column-tree__arrow--rotated': props.rotated
      }]
    })
}

const TreeIndent = {
  functional: true,
  render: (h, { children }) =>
    h('span', { class: 'vk-table-column-tree__indent' }, children)
}

export default {
  name: 'VkTableTreeColumn',
  functional: true,
  props: assign({}, Column.props),
  render: Column.render,
  cellRender (h, { data, props, parent }) {
    const { $row } = data
    const { cell, cellClass } = props

    const cellValue = get($row, cell)

    const defaultCellSlot = () => [
      Array($row[ROW_LEVEL]).fill(h(TreeIndent)),

      parent.thereAreSubLevels && h(TreeIndent, [
        $row[ROW_CHILDREN_COUNT] && h(TreeArrow, {
          props: {
            rotated: parent.isExpanded($row)
          },
          on: {
            click: e => {
              e[ROW_CLICK_PREVENTED] = true
              parent.toggleExpand($row)
            }
          }
        })
      ]),

      h('span', cellValue)
    ]

    // support custom slots with fallback
    const cellSlot = get(data, 'scopedSlots.cell', defaultCellSlot)
    const emptySlot = get(data, 'scopedSlots.emptyCell', () => '')

    return h(ElementTd, {
      props,
      class: cellClass
    }, [
      isUndef(cellValue)
        ? emptySlot($row)
        : cellSlot(cellValue, $row)
    ])
  }
}
