export default {
  name: 'VkTableColumn',
  props: {
    // the header label
    header: {
      type: String
    },
    // the cell key
    cell: {
      type: String
    }
  },
  render (h) {
    return (<col />)
  },
  created () {
    this._headerRender = this.$options._parentVnode.componentOptions.Ctor.options.headerRender
    this._cellRender = this.$options._parentVnode.componentOptions.Ctor.options.cellRender
  },
  headerRender (h) {
    const scopedSlot = this.$scopedSlots && this.$scopedSlots.header
    return (<th>{ scopedSlot ? scopedSlot() : this.header }</th>)
  },
  cellRender (h, { row, rowIndex }) {
    const cell = this.cell
    const scopedSlot = this.$scopedSlots && this.$scopedSlots.cell
    return (<td>{ scopedSlot ? scopedSlot({ row, rowIndex }) : row[cell] }</td>)
  }
}
