const Row = {
  functional: true,
  props: ['row'],
  render (h, { parent, props }) {
    const { fieldsDef, rowsClass } = parent
    const { row } = props
    return h('tr', {
      staticClass: rowsClass,
      class: {
        'uk-active': parent.isSelected(row)
      },
      on: {
        click: e => {
          if (e.target.tagName === 'TD') {
            parent.$emit('clickRow', row)
          }
        }
      }
    }, fieldsDef.map(field =>
      h(Cell, { props: { field, row } })
    ))
  }
}

const Cell = {
  functional: true,
  props: ['row', 'field'],
  render (h, { parent, props }) {
    const { row, field } = props
    return h('td', { class: field.cellClass }, [
      // default or custom render
      (typeof field.cell === 'function')
        ? h({
          functional: true,
          props: ['row', 'field'],
          render: field.cell
        }, { props: { row, field } })
        : field.cell || row[ field.name ]
    ])
  }
}

export default Row
