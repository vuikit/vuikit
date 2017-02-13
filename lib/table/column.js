export default {
  render (h) {
    return h('col')
  },
  created () {
    this._headerRender = this.$options._parentVnode.componentOptions.Ctor.options.headerRender
    this._cellRender = this.$options._parentVnode.componentOptions.Ctor.options.cellRender
    this.$parent.columns.push(this)
  },
  headerRender (h) {
    return h('th', {
      staticClass: this.headerClass,
      scopedSlots: this.$scopedSlots
    }, [
      this._t('header', this.header)
    ])
  },
  cellRender (h, { row, rowIndex }) {
    const cellDefContent = row[this.cell]
    return h('td', {
      staticClass: this.cellClass,
      scopedSlots: this.$scopedSlots
    }, [
      this._t('cell', cellDefContent, { row, rowIndex })
    ])
  }
}
