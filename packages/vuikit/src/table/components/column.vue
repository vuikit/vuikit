<script>
import { mergeData } from 'vuikit/src/_core/utils/vue'
import { assign, get } from 'vuikit/src/_core/utils/object'
import { isUndefined, isFunction } from 'vuikit/src/_core/utils/lang'

import { VkTableElTd, VkTableElTh } from '../elements'

export default {
  functional: true,
  props: assign({}, VkTableElTh.props, VkTableElTd.props, {
    head: String,
    cell: [String, Function]
  }),
  // IMPORTANT: this render is not used directly,
  // is a workaround to retrieve the slots and data
  render (h, { data, props, slots }) {
    data.staticSlots = slots()
    return h('div', mergeData({}, data, { props }))
  },
  headRender (h, { props }) {
    return [props.head]
  },
  cellRender (h, { props, data }) {
    const { cell, row, slots = { static: {}, scoped: {} } } = props

    const cellValue = resolveCellValue(row, cell)
    const isEmpty = !isUndefined(cell) && isUndefined(cellValue)

    const scope = { value: cellValue, row }
    const defaultSlot = slots.static.default
      ? () => slots.static.default
      : slots.scoped.default || (() => cellValue)
    const emptySlot = slots.static.empty
      ? () => slots.static.empty
      : slots.scoped.empty

    return [
      isEmpty && emptySlot
        ? emptySlot(scope)
        : defaultSlot(scope)
    ]
  }
}

function resolveCellValue (row, cell) {
  return isFunction(cell)
    ? cell(row)
    : get(row, cell)
}
</script>
