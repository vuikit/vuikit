import Column from './table-column'
import ElementThSort from './elements/table-th-sort'
import mergeData from 'vuikit/src/util/vue-data-merge'
import { assign } from 'vuikit/src/util/lang'

import { UPDATE_SORTEDBY } from './constants'

export default {
  name: 'VkTableColumnSort',
  functional: true,
  props: assign({}, Column.props, ElementThSort),
  cellRender: Column.cellRender,
  render (h, { data, props, children, parent }) {
    const { title } = props

    // workarount to avoid duplicate classes
    // during the rerendering done by the table
    delete data.class

    return h(ElementThSort, {
      props: mergeData(data, {
        order: parent.sortedBy[props.cell]
      }, props),
      on: {
        click: e => {
          const sortedBy = getNewSortOrder(parent.sortedBy, props.cell, e.shiftKey)
          parent.$emit(UPDATE_SORTEDBY, sortedBy)
        }
      }
    }, title || children)
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
