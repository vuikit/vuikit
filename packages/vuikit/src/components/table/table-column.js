import ElementTh from './elements/table-th'
import ElementTd from './elements/table-td'
import mergeData from 'vuikit/src/util/vue-data-merge'
import { get, isUndef, assign } from 'vuikit/src/util/lang'

export default {
  name: 'VkTableColumn',
  functional: true,
  props: assign({}, ElementTh.props, {
    title: {
      type: String
    },
    cell: {
      type: String
    },
    cellClass: {
      type: String
    }
  }),
  render (h, { data, props, children }) {

    // workarount to avoid duplicate classes
    // during the rerendering done by the table
    delete data.class

    return h(ElementTh, mergeData(data, {
      props,
      class: 'vk-table-column'
    }), props.title || children)
  },
  cellRender (h, { data, props }) {
    const { $row } = data
    const { cell, cellClass } = props

    const cellValue = get($row, cell)

    // support custom slots with fallback
    const cellSlot = get(data, 'scopedSlots.cell', () => cellValue)
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
