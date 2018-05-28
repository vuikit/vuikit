import { get } from 'vuikit/src/_core/utils/misc'
import { mergeData } from 'vuikit/src/_core/utils/vue'
import { assign, isUndefined, isFunction } from 'vuikit/src/_core/utils/lang'

import { ElTableTd, ElTableTh } from '../elements'

export default {
  functional: true,
  name: 'VkTableColumn',
  props: assign({}, ElTableTh.props, ElTableTd.props, {
    head: String,
    cell: [String, Function],
    cellClass: String
  }),
  render (h, { data, props, slots }) {
    // IMPORTANT: this render is not used directly,
    // is a workaround to retrieve the slots and data
    data.slots = slots()
    return h('div', mergeData({}, data, { props }))
  },
  headRender (h, { data, props }) {
    return h(ElTableTh, mergeData({}, data, {
      props
    }), props.head)
  },
  cellRender (h, ctx) {
    const { props, row } = ctx
    const { cell, cellClass } = props
    const cellValue = getCellValue(row, cell)
    const isEmpty = !isUndefined(cell) && isUndefined(cellValue)

    const scope = getCellScope(ctx)
    const slots = getCellSlots(ctx)

    const slot = isEmpty && slots.empty
      ? slots.empty
      : slots.default || (({ cell }) => cell)

    return h(ElTableTd, {
      props,
      class: cellClass
    }, [
      slot(scope)
    ])
  },
  getCellValue,
  getCellScope,
  getCellSlots
}

function getCellValue (row, cell) {
  if (isFunction(cell)) {
    return cell(row)
  }

  return get(row, cell)
}

export function getCellScope ({ data, props, parent, row }) {
  const { cell } = props
  const cellValue = getCellValue(row, cell)

  const isSelected = parent.isRowSelected(row)
  const isAllSelected = parent.allRowsSelected

  return { cell: cellValue, row: row, isSelected, isAllSelected }
}

export function getCellSlots ({ slots, data }) {
  const _slots = slots()

  const defaultSlot = get(_slots, 'default')
    ? () => get(_slots, 'default')
    : get(data, 'scopedSlots.default')

  const emptySlot = get(_slots, 'empty')
    ? () => get(_slots, 'empty')
    : get(data, 'scopedSlots.empty')

  return {
    default: defaultSlot,
    empty: emptySlot
  }
}
