import { get } from '@vuikit/core/utils/misc'
import { assign } from '@vuikit/core/utils/lang'

import Column from './column'
import { ElTableTd } from '../elements'

import { ROW_LEVEL, ROW_CLICK_PREVENTED, ROW_CHILDREN_COUNT } from '../constants'

const TreeArrow = {
  functional: true,
  name: 'VkTableColumnTree',
  props: ['rotated'],
  render: (h, { listeners, props }) => {
    return h('span', {
      on: listeners,
      class: ['vk-table-column-tree__arrow', {
        'vk-table-column-tree__arrow--rotated': props.rotated
      }]
    })
  }
}

const TreeIndent = {
  functional: true,
  render: (h, { children }) => {
    return h('span', { class: 'vk-table-column-tree__indent' }, children)
  }
}

export default {
  name: 'VkTableTreeColumn',
  functional: true,
  props: assign({}, Column.props),
  render: Column.render,
  headRender: Column.headRender,
  cellRender (h, { props, data, parent, row }) {
    const { cell, cellClass } = props
    const cellValue = get(row, cell)

    return h(ElTableTd, {
      props,
      class: cellClass
    }, [
      Array(row[ROW_LEVEL]).fill(h(TreeIndent)),

      parent.thereAreSubLevels && h(TreeIndent, [
        row[ROW_CHILDREN_COUNT] && h(TreeArrow, {
          props: {
            rotated: parent.isExpanded(row)
          },
          on: {
            click: e => {
              e[ROW_CLICK_PREVENTED] = true
              parent.toggleExpand(row)
            }
          }
        })
      ]),

      h('span', cellValue)
    ])
  }
}
