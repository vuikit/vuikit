import { get } from 'vuikit/src/_core/utils/misc'
import { warn } from 'vuikit/src/_core/utils/debug'
import { mergeData } from 'vuikit/src/_core/utils/vue'
import { assign, isUndefined, isFunction } from 'vuikit/src/_core/utils/lang'

import { UPDATE_SORTEDBY } from '../constants'
import { ElTableTd, ElTableTh, ElTableThSort } from '../elements'

export default {
  functional: true,
  name: 'VkTableColumn',
  props: assign({}, ElTableTh.props, ElTableThSort.props, ElTableTd.props, {
    head: String,
    cell: [String, Function],
    cellClass: String,
    sortable: {
      type: Boolean,
      default: false
    }
  }),
  render (h, { data, props, slots }) {
    // IMPORTANT: this render is not used directly,
    // is a workaround to retrieve the slots and data
    data.slots = slots()
    return h('div', mergeData({}, data, { props }))
  },
  headRender (h, { data, props, parent }) {

    if (process.env.NODE_ENV !== 'production' && props.sortable) {
      if (!parent.sortedBy) {
        warn(`vk-table -> 'sortedBy' prop undefined.`, parent)
      }

      if (!props.head || !props.cell) {
        warn(`vk-table-column -> 'head' and 'cell' props are required on sortable columns.`, parent)
      }
    }

    // sortable
    if (props.sortable) {
      return h(ElTableThSort, mergeData(data, {
        props: assign({}, props, {
          order: get(parent, `sortedBy.${props.cell}`)
        }),
        on: {
          click: e => {
            const sortedBy = getNewSortOrder(parent.sortedBy, props.cell, e.shiftKey)
            parent.$emit(UPDATE_SORTEDBY, sortedBy)
          }
        }
      }), props.head)
    }

    // default
    return h(ElTableTh, mergeData(data, { props }), props.head)
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
  }
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

function getNewSortOrder (currentSort, by, multi) {
  const sort = {}
  const order = currentSort[by] === 'asc'
    ? 'desc'
    : 'asc'

  sort[by] = order

  return multi
    ? assign({}, currentSort, sort)
    : sort
}
