import ElementTd from '../elements/table-td'

import { get, isDef, isUndef } from 'vuikit/src/util/lang'

export default function (h, ctx, defaultContent) {
  const { props, data } = ctx
  const { $row } = data
  const { cell, cellClass } = props
  const cellValue = get($row, cell)
  const isEmpty = isDef(cell) && isUndef(cellValue)

  const scope = getCellScope(ctx)
  const slots = getCellSlots(ctx)

  const slot = isEmpty && slots.empty
    ? slots.empty
    : slots.default || defaultContent

  return h(ElementTd, {
    props,
    class: cellClass
  }, [
    slot(scope)
  ])
}

function getCellScope ({ data, props, parent }) {
  const { $row } = data
  const { cell } = props
  const cellValue = get($row, cell)

  const selected = parent.isRowSelected($row)
  const allSelected = parent.allRowsSelected

  return { cell: cellValue, row: $row, selected, allSelected }
}

function getCellSlots ({ data }) {
  const defaultSlot = get(data, 'slots.default')
    ? () => get(data, 'slots.default')
    : get(data, 'scopedSlots.default')

  const emptySlot = get(data, 'slots.empty')
    ? () => get(data, 'slots.empty')
    : get(data, 'scopedSlots.empty')

  return {
    default: defaultSlot,
    empty: emptySlot
  }
}
