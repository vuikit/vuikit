import ElementTr from './elements/table-tr'
import ElementTable from './elements/table'

import { warn } from 'vuikit/src/util/debug'
import { isFunction, get } from 'vuikit/src/util/lang'

import { ON_CLICK_ROW, ROW_CLICK_PREVENTED } from './constants'

const Row = {
  functional: true,
  render (h, { data, children, parent }) {
    const { $row } = data

    return h(ElementTr, {
      props: {
        active: parent.isRowSelected($row)
      },
      class: resolveClass(parent.rowClass, $row),
      on: {
        click: e => {
          const isPrevented = e[ROW_CLICK_PREVENTED]
          const isIgnoredTag = /^(A|BUTTON)$/.test(e.target.tagName)

          if (isPrevented || isIgnoredTag) {
            return
          }

          parent.$emit(ON_CLICK_ROW, $row)
        }
      }
    }, children)
  }
}

export default function (h, { rows, props, columns, table }) {
  const isHeadless = !columns.some(
    node => node.children || get(node, 'data.domProps.textContent')
  )

  return h(ElementTable, { props }, [
    isHeadless || h('thead', [
      h(ElementTr, columns.map(node =>
        // rerender the column so Table become it parent
        h(node.fnOptions, node.data)
      ))
    ]),
    h('tbody', rows.map(($row, index) => {
      return h(Row, { $row },
        columns.map(node => {
          const data = node.data
          const fnOptions = node.fnOptions

          if (process.env.NODE_ENV !== 'production' && !fnOptions) {
            warn('vk-table -> column must be a functional component', table)
          }

          if (process.env.NODE_ENV !== 'production' && !fnOptions.cellRender) {
            warn('vk-table -> column definition is missing cellRender', table)
          }

          const Cell = {
            functional: true,
            render: fnOptions.cellRender
          }

          return h(Cell, { $row, props: data.props, scopedSlots: data.scopedSlots })
        })
      )
    }))
  ])
}

function resolveClass (rowClass, row) {
  return isFunction(rowClass)
    ? rowClass(row)
    : rowClass
}
