import { isFunction } from 'src/js/util/index'
import Column from './table-column'
import ColumnSelect from './table-column-select'
import ColumnSort from './table-column-sort'

const columns = {
  default: Column,
  select: ColumnSelect,
  sort: ColumnSort
}

export default {
  functional: true,
  props: {
    definition: {
      type: Array,
      required: true
    }
  },
  render (h, { props }) {
    return props.definition.map(col => h(parseType(col), parseData(col)))
  }
}

function parseType (col) {
  const type = col.type || 'default'
  return columns[type]
}

function parseData (col) {
  const props = {}
  const scopedSlots = {}

  // header
  props.header = col.header
  props.headerClass = col.headerClass
  if (col.headerRender && isFunction(col.headerRender)) {
    scopedSlots.header = col.headerRender
  }

  // cell
  props.cell = col.cell
  props.cellClass = col.cellClass
  if (col.cellRender && isFunction(col.cellRender)) {
    scopedSlots.cell = col.cellRender
  }

  return { props, scopedSlots }
}
