import { get } from 'vuikit/src/util/misc'
import { warn } from 'vuikit/src/util/debug'
import { assign } from 'vuikit/src/util/lang'
import { mergeData } from 'vuikit/src/util/vue'

import Column from './table--column'
import { ElementTableThSort } from '../elements'
import { UPDATE_SORTEDBY } from '../constants'

export default {
  name: 'VkTableColumnSort',
  functional: true,
  props: assign({}, Column.props, ElementTableThSort, {
    // for a sort column we make cell prop required
    // as the is no way to order otherwise
    cell: {
      type: String,
      required: true
    }
  }),
  render: Column.render,
  cellRender: Column.cellRender,
  headRender (h, { data, props, children, parent }) {
    const { title } = props

    if (process.env.NODE_ENV !== 'production' && !parent.sortedBy) {
      warn(`vk-table-column-sort -> the table 'sortedBy' prop is required when using this column.`, parent)
    }

    return h(ElementTableThSort, mergeData(data, {
      props: assign({
        order: get(parent, `sortedBy.${props.cell}`)
      }, props),
      on: {
        click: e => {
          const sortedBy = getNewSortOrder(parent.sortedBy, props.cell, e.shiftKey)
          parent.$emit(UPDATE_SORTEDBY, sortedBy)
        }
      }
    }), title || children)
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
