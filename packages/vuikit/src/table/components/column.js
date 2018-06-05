import { get } from 'vuikit/src/_core/utils/misc'
import { warn } from 'vuikit/src/_core/utils/debug'
import { mergeData } from 'vuikit/src/_core/utils/vue'
import { assign, isUndefined, isFunction } from 'vuikit/src/_core/utils/lang'

import { ElTableTd, ElTableTh } from '../elements'

export default {
  functional: true,
  name: 'VkTableColumn',
  props: assign({}, ElTableTh.props, ElTableTd.props, {
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

    return h(ElTableTh, mergeData(data, {
      props,
      on: {
        click: e => {
          if (props.sortable) {
            parent.sortBy(props.cell, e.shiftKey)
          }
        }
      }
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
  }
}

function getCellValue (row, cell) {
  return isFunction(cell)
    ? cell(row)
    : get(row, cell)
}

export function getCellScope ({ data, props, parent, row }) {
  const { cell } = props
  const cellValue = getCellValue(row, cell)

  return { cell: cellValue, row: row }
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
