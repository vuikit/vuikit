import { get } from '@vuikit/utils/misc'

export function getCellScope ({ data, props, parent }) {
  const { $row } = data
  const { cell } = props
  const cellValue = get($row, cell)

  const isSelected = parent.isRowSelected($row)
  const isAllSelected = parent.allRowsSelected

  return { cell: cellValue, row: $row, isSelected, isAllSelected }
}

export function getCellSlots ({ data }) {
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
