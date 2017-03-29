import Column from './column.js'
import Checkbox from './checkbox'

export default {
  name: 'VkTableColumnSelect',
  extends: Column,
  props: {
    headerClass: {
      type: String
    },
    cellClass: {
      type: String
    },
    isSelected: {
      type: Function,
      default: () => false
    }
  },
  headerRender () {
    const h = this.$createElement
    const rows = this.$parent.data
    const selected = rows.filter(this.isSelected)
    const isAllSelected = selected.length && selected.length === rows.length
    const defaultContent = h(Checkbox, {
      props: { checked: isAllSelected },
      on: { click: e => this.$emit('select-all') }
    })
    const slot = this.processSlot('header', {}, defaultContent)
    const staticClass = this.joinClasses(
      'uk-form uk-text-center uk-table-shrink', this.headerClass
    )
    return h('th', { staticClass }, [ slot ])
  },
  cellRender ({ row }) {
    const h = this.$createElement
    const defaultContent = h(Checkbox, {
      props: { checked: this.isSelected(row) },
      on: { click: e => this.$emit('select', row) }
    })
    const slot = this.processSlot('cell', { row }, defaultContent)
    const staticClass = this.joinClasses(
      'uk-form uk-text-center vk-table-width-minimum', this.cellClass
    )
    return h('td', { staticClass }, [ slot ])
  },
  created () {
    // as there is no select state to react on, the update must be forced
    this.$parent.$on('click-row', () => this.$parent.$forceUpdate())
    this.$on('select', () => this.$parent.$forceUpdate())
    this.$on('select-all', () => this.$parent.$forceUpdate())
  }
}
