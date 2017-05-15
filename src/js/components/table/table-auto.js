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
      const component = mapColumnComponent(column)
      // important: add the unique column key for correct rendering
      const key = hash({ ...column, type: component.name })
      // render
      return h(component, { key, ...getColumnObject(column) })
    })
  }
}

function hash (obj) {
  return Object.keys(obj)
    .reduce((hash, key) => `${obj[key]}${hash}`, '')
    .replace(/ /g, '')
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

    // if (isObject(column)) {
    //   const { type, header } = column
    //   // get column
    //   const column = presets[type]
    //   // override props
    //   column.header = header
    //   return column
    // }

    return definition
  }).filter(c => c)
}

function getColumnObject (column) {
  const props = {}
  const scopedSlots = {}

  // header
  props.header = column.header
  props.headerClass = column.headerClass

  // cell
  props.cell = column.cell
  props.cellClass = column.cellClass
  if (column.cellRender && isFunction(column.cellRender)) {
    scopedSlots.default = column.cellRender
  }

  // render
  return { props, scopedSlots }
}
