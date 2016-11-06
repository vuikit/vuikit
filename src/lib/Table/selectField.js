import Checkbox from './Checkbox'

export default {
  headerClass: 'uk-form vk-table-width-minimum',
  header (h, { parent: vm, props }) {
    return h(Checkbox, {
      props: {
        checked: vm.isAllSelected
      },
      on: {
        click: e => vm.$emit('selectAll', vm.rows.map(row => vm.getRowId(row)), vm.rows)
      }
    })
  },
  cellClass: 'uk-form vk-table-width-minimum',
  cell (h, { parent: vm, props }) {
    const { row } = props
    return h(Checkbox, {
      props: {
        checked: vm.isSelected(row)
      },
      on: {
        click: e => vm.$emit('select', vm.getRowId(row), row)
      }
    })
  }
}
