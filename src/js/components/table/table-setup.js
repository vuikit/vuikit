import { isFunction, warn } from '@vuikit/util'
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
    presets: {
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  render (h, { props }) {
    const columns = mapPresets(props.presets, props.columns)
    return columns.map(column => {
      const key = getKey(column)
      return h(mapColumnComponent(column), { key, ...getColumnObject(column) })
    })
  }
}

function getKey (column) {
  const type = mapColumnComponent(column)
  return JSON.stringify({ column, type: type.name || type })
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
      warn(`Table preset '${column}' doesn't exist.`)
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
  props.shrink = column.shrink
  props.expand = column.expand
  props.headerClass = column.headerClass

  // cell
  props.cell = column.cell
  props.cellClass = column.cellClass
  if (column.cellTemplate && isFunction(column.cellTemplate)) {
    scopedSlots.cellTemplate = column.cellTemplate
  }

  // render
  return { props, scopedSlots }
}
