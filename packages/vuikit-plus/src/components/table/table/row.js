import { isFunction } from '@vuikit/core/util'

export default {
  functional: true,
  props: ['row'],
  render (h, { props, children, parent: table }) {
    const { row } = props

    return h('tr', {
      class: [resolveClass(table.rowClass, row), {
        'uk-active': table.isSelected(row)
      }],
      on: {
        click: e => table.$emit('click-row', row)
      }
    }, children)
  }
}

function resolveClass (rowClass, row) {
  return isFunction(rowClass)
    ? rowClass(row)
    : rowClass
}
