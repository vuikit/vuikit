import { get } from '@vuikit/utils/misc'
import { warn } from '@vuikit/utils/debug'
import { assign } from '@vuikit/utils/lang'
import { mergeData } from '@vuikit/utils/vue'

import Column from './table--column'
import { ElTableThSort } from '../elements'
import { UPDATE_SORTEDBY } from '../constants'

export default {
  name: 'VkTableColumnSort',
  functional: true,
  props: assign({}, Column.props, ElTableThSort, {
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

    return h(ElTableThSort, mergeData(data, {
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
