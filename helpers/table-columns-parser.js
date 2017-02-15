var isFunction = require('../utils/is-function.js')
var isString = require('../utils/is-string.js')

module.exports = function (columns) {
  return {
    functional: true,
    render (h) {
      return columns
        .map(parseColumn)
        .map(parseColumnType(h))
    }
  }
}

function parseColumn (col) {
  const props = {}
  const slots = {}

  // sort
  if (col.sort) {
    props.sortBy = isString(col.sort)
      ? col.sort
      : col.cell
  }

  // header
  if (isFunction(col.header)) {
    slots.header = col.header
  } else {
    props.header = col.header
  }
  props.headerClass = col.headerClass

  // cell
  if (isFunction(col.cell)) {
    slots.cell = col.cell
  } else {
    props.cell = col.cell
  }
  props.cellClass = col.cellClass

  return { props, scopedSlots: slots }
}

function parseColumnType (h) {
  return col => {
    const type = col.props.sortBy
      ? 'VkTableColumnSort'
      : 'VkTableColumn'
    return h(type, col)
  }
}
