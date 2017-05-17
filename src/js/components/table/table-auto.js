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
      const key = hash({ ...column, type: component.name || component })
      // render
      return h(component, { key, ...getColumnObject(column) })
    })
  }
}

function hash (obj) {
  // obj => string
  const string = Object.keys(obj)
    .reduce((hash, key) => `${obj[key]}${hash}`, '')
    .replace(/ /g, '')

  return strhash(string)
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

// Simple but unreliable function to create string hash
function strhash (str) {
  if (str.length % 32 > 0) str += Array(33 - str.length % 32).join('z')
  let hash = ''
  const bytes = []
  let i = 0
  let j = 0
  let k = 0
  let a = 0
  let dict = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  for (i = 0; i < str.length; i++) {
    let ch = str.charCodeAt(i)
    bytes[j++] = (ch < 127) ? ch & 0xFF : 127
  }
  const chunkLen = Math.ceil(bytes.length / 32)
  for (i = 0; i < bytes.length; i++) {
    j += bytes[i]
    k++
    if ((k === chunkLen) || (i === bytes.length - 1)) {
      a = Math.floor(j / k)
      if (a < 32) {
        hash += '0'
      } else if (a > 126) {
        hash += 'z'
      } else {
        hash += dict[ Math.floor((a - 32) / 2.76) ]
      }
      j = k = 0
    }
  }
  return hash
}
