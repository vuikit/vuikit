// Header is the default component render
function headerRender (h) {
  const Table = this.$parent
  return (<th class="uk-form vk-table-width-minimum">{
    this.$scopedSlots.header
      ? this.$scopedSlots.header()
      : h(Checkbox, {
        props: {
          checked: Table.isAllSelected()
        },
        on: {
          click: e => {
            Table.$emit('selectAll', Table.data.map(row => Table.getRowId(row)), Table.data)
          }
        }
      })
  }</th>)
}

// Cell is a functional component render
const cellRender = {
  functional: true,
  props: ['row', 'rowIndex', 'prop'],
  render (h, { props, data, parent: vm }) {
    const { scopedSlots } = data
    const cell = scopedSlots && scopedSlots.cell
    const { row } = props
    return (<td class="uk-form vk-table-width-minimum">{
      cell
      ? cell(props)
      : h(Checkbox, {
        props: {
          checked: vm.isSelected(row)
        },
        on: {
          click: e => {
            vm.$emit('select', vm.getRowId(row), row)
          }
        }
      })
    }</td>)
  }
}

const Checkbox = {
  functional: true,
  props: ['checked'],
  render (h, { data, props }) {
    return h('input', {
      ...data,
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: props.checked
      },
      on: {
        click: e => {
          // ensure the browser doesn't apply
          // the checked state on click
          e.target.checked = props.checked
          // trigger any click event
          if (data.on && data.on.click) {
            data.on.click.call(this, e)
          }
        }
      }
    })
  }
}

export default {
  name: 'VkTableColumnSelect',
  render: headerRender,
  cellRender
}
