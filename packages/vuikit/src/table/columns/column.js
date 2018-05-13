import { get } from '@vuikit/core/utils/misc'
import { mergeData } from '@vuikit/core/utils/vue'
import { assign, isUndefined, isFunction } from '@vuikit/core/utils/lang'

import { ElTableTd, ElTableTh } from '../elements'

export default {
  functional: true,
  name: 'VkTableColumn',
  props: assign({}, ElTableTh.props, ElTableTd.props, {
    cell: [String, Function],
    title: String,
    cellClass: String
  }),
  render (h, { data, props, slots }) {
    // IMPORTANT: the render is not used for rendering, but is required by Vue.
    // As a workaround we are rendering an empty element just to pick up data
    data.slots = slots()
    return h('div', mergeData({}, data, { props }))
  },
  headRender (h, { data, props }) {
    return h(ElTableTh, mergeData({}, data, {
      props
    }), props.title)
  },
  cellRender (h, ctx) {
    const { props, data } = ctx
    const { $row } = data
    const { cell, cellClass } = props
    const cellValue = getCellValue($row, cell)
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

function getCellValue ($row, cell) {
  if (isFunction(cell)) {
    return cell($row)
  }

  return get($row, cell)
}

export function getCellScope ({ data, props, parent }) {
  const { $row } = data
  const { cell } = props
  const cellValue = getCellValue($row, cell)

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
