import { isFunction, warn } from 'src/js/util/index'
import Column from './table-column'
import ColumnSelect from './table-column-select'
import ColumnSort from './table-column-sort'

const columnTypes = {
  default: Column,
  select: ColumnSelect,
  sort: ColumnSort
}

export default {
  functional: true,
  props: {
    definition: {
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  render (h, { props }) {
    const columns = mapPresets(props.definition, props.columns)
    return columns.map(column => {
      const key = JSON.stringify(column)
      return h(mapColumnComponent(column), { key, ...getColumnObject(column) })
    })
  }
}

function mapColumnComponent (column) {
  let type = column.type || 'default'
  return columnTypes[type] !== undefined
    ? columnTypes[type]
    : type
}

function mapPresets (presets, columns) {
  return columns.map(column => {
    const definition = presets[column]

    if (definition === undefined) {
      warn(`Vuikit Table: The column preset '${column}' doesn't exist.`)
      return false
    }

    return definition
  }).filter(c => c)
}

function getColumnObject (column) {
  const props = {}
  const scopedSlots = {}

  // header
  props.header = column.header
  let staticClass = column.class

  // cell
  props.cell = column.cell
  props.cellClass = column.cellClass
  if (column.cellTemplate && isFunction(column.cellTemplate)) {
    scopedSlots.cellTemplate = column.cellTemplate
  }

  // render
  return { staticClass, props, scopedSlots }
}
