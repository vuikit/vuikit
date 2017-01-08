import { warn } from 'helpers/util'
import Column from './Default'

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
  extends: Column,
  props: {
    trackBy: {
      type: String
    },
    selection: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.$parent.$on('clickRow', row => {
      this.$emit('selectRow', this.getRowId(row), row)
    })
  },
  methods: {
    getRowId (row) {
      if (warn && this.trackBy && row[this.trackBy] === undefined) {
        warn(`VkTable - The selection of the rows could fail as some
          data rows are missing the trackBy field.`)
      }
      return this.trackBy
        ? row[this.trackBy]
        : this.$parent.data.indexOf(row)
    },
    isAllSelected () {
      return this.$parent.data.length && this.$parent.data.every(row => this.isSelected(row))
    },
    isSelected (row) {
      return this.selection[this.getRowId(row)]
    }
  },
  headerRender (h) {
    const _parent = this.$parent
    const scopedSlot = this.$scopedSlots && this.$scopedSlots.header
    return (<th staticClass={ this.headerClass } class="uk-form uk-text-center vk-table-width-minimum">{
      scopedSlot
        ? scopedSlot()
        : h(Checkbox, {
          props: {
            checked: this.isAllSelected()
          },
          on: {
            click: e => {
              this.$emit('selectAll', _parent.data.map(row => this.getRowId(row)), _parent.data)
            }
          }
        })
    }</th>)
  },
  cellRender (h, { row }) {
    const scopedSlot = this.$scopedSlots && this.$scopedSlots.cell
    return (<td staticClass={ this.cellClass } class="uk-form uk-text-center vk-table-width-minimum">{
      scopedSlot
      ? scopedSlot({ rowId: this.getRowId(row), row })
      : h(Checkbox, {
        props: {
          checked: this.isSelected(row)
        },
        on: {
          click: e => {
            this.$emit('select', this.getRowId(row), row)
          }
        }
      })
    }</td>)
  }
}
