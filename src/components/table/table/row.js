import { isFunction } from '@vuikit/util'

export default {
  functional: true,
  render (h, { props, children, parent: table }) {
    const { row } = props
    const onClick = e => targetIsRow(e) && table.$emit('click-row', row)
    const classes = [ resolveClass(table.rowClass, row) || '' ]

    if (table.isSelected(row)) {
      classes.push('uk-active')
    }

    return h('tr', {
      class: classes,
      on: {
        click: onClick
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
