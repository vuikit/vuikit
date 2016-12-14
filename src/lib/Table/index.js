function render (h) {
  return (
    <table staticClass="uk-table" class={{
      'uk-table-striped': this.striped,
      'uk-table-condensed': this.condensed,
      'uk-table-hover': this.hover
    }}>
      <thead>
        <tr>{ this.$slots.default }</tr>
      </thead>
      <tbody>
        { this._l(this.data, (row, rowIndex) =>
          <tr class={{
            'uk-active': this.isSelected(row)
          }} on-click={ e =>
            (e.target.tagName === 'TD') && this.$emit('clickRow', this.getRowId(row), row)
          }>
            { this._l(this.columns, col => col.cell(h, { row, rowIndex })) }
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default {
  name: 'VkTable',
  render,
  props: {
    data: {
      type: Array,
      required: true
    },
    trackBy: {
      type: String
    },
    condensed: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    sortedBy: {
      type: Object,
      default: () => ({}) // { field: [asc|desc] }
    },
    selection: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    columns () {
      return this.$slots.default.filter(node =>
        node.componentOptions && node.componentOptions.tag.match(/vk-table-column/)
      ).map(slot => {
        const propsData = slot.componentOptions.propsData
        const scopedSlots = slot.data.scopedSlots
        const options = slot.componentOptions.Ctor.options
        return {
          cell (h, props) {
            return h(options.cellRender, { scopedSlots, props: {...props, ...propsData} })
          }
        }
      })
    }
  },
  methods: {
    getRowId (row) {
      return row[this.trackBy]
    },
    isAllSelected () {
      return this.data.length && this.data.every(row => this.isSelected(row))
    },
    isSelected (row) {
      return this.selection[this.getRowId(row)]
    }
  }
}
