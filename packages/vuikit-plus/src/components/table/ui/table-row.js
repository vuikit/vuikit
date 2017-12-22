import isFunction from '@vuikit/core/utils/is-function'

export default {
  functional: true,
  render (h, { props, children, parent: table }) {
    const { row } = props

    return h('tr', {
      class: [resolveClass(table.rowClass, row), {
        'uk-active': table.isSelected(row)
      }],
      on: {
        click: e => targetIsRow(e) && table.$emit('click-row', row)
      }
    }, [
      children
    ])
  }
}

function targetIsRow (e) {
  return e.target.tagName === 'TR' || e.target.tagName === 'TD'
}

function resolveClass (c, row) {
  return isFunction(c)
    ? c(row)
    : c
}
