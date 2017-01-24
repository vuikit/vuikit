export default {
  render (h) {
    return h('col')
  },
  created () {
    this._headerRender = this.$options._parentVnode.componentOptions.Ctor.options.headerRender
    this._cellRender = this.$options._parentVnode.componentOptions.Ctor.options.cellRender
  },
  headerRender (h) {
    const scopedSlot = this.$scopedSlots && this.$scopedSlots.header
    return h('th', {
      staticClass: this.headerClass
    }, [ scopedSlot
      ? scopedSlot()
      : this.header
    ])
  },
  cellRender (h, { row, rowIndex }) {
    const cell = this.cell
    const scopedSlot = this.$scopedSlots && this.$scopedSlots.cell
    return h('td', {
      staticClass: this.cellClass
    }, [ scopedSlot
      ? scopedSlot({ row, rowIndex })
      : row[cell]
    ])
  }
}
