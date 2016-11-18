import { isFunction } from '../../helpers/util'

const Row = {
  functional: true,
  props: ['row'],
  render (h, { parent: vm, props }) {
    const { fieldsDef } = vm
    const { row } = props
    return h('tr', {
      class: {
        'uk-active': vm.isSelected(row)
      },
      on: {
        click: e => {
          if (e.target.tagName === 'TD') {
            vm.$emit('clickRow', vm.getRowId(row), row)
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
  render (h, { props }) {
    const { row, field } = props
    return h('td', { class: field.cellClass }, [
      // default or custom render
      isFunction(field.cell)
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
