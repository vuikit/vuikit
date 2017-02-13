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
  headerRender (h) {
    const rows = this.$parent.data
    const isAllSelected = rows.filter(this.isSelected).length === rows.length
    const checkbox = h(Checkbox, {
      props: { checked: isAllSelected },
      on: {
        // as the state is not changed we must force update
        click: e => this.$emit('select-all') && this.$parent.$forceUpdate()
      }
    })
    return h('th', {
      staticClass: this.headerClass,
      class: 'uk-form uk-text-center uk-table-shrink',
      scopedSlots: this.$scopedSlots
    }, [
      this._t('header', checkbox)
    ])
  },
  cellRender (h, { row }) {
    const checkbox = h(Checkbox, {
      props: { checked: this.isSelected(row) },
      on: {
        // as the state is not changed we must force update
        click: e => this.$emit('select', row) && this.$parent.$forceUpdate()
      }
    })
    return h('td', {
      staticClass: this.cellClass,
      class: 'uk-form uk-text-center vk-table-width-minimum',
      scopedSlots: this.$scopedSlots
    }, [
      this._t('header', checkbox, { row })
    ])
  },
  created () {
    this.$parent.$on('click-row', this.$parent.$forceUpdate)
  }
}
