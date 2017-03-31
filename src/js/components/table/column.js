import { get } from 'src/js/util/index'

export default {
  render (h) {
    return h('col')
  },
  created () {
    // make available the below render functions on component instance
    this._headerRender = this.$options._parentVnode.componentOptions.Ctor.options.headerRender
    this._cellRender = this.$options._parentVnode.componentOptions.Ctor.options.cellRender
    // add column
    this.$parent.columns.push(this)
  },
  headerRender () {
    const h = this.$createElement
    const defaultContent = this.header
    const slot = this.processSlot('header', {}, defaultContent)
    return h('th', { staticClass: this.headerClass }, [ slot ])
  },
  cellRender ({ row }) {
    const h = this.$createElement
    const defaultContent = get(row, this.cell, '')
    const slot = this.processSlot('cell', { row }, defaultContent)
    return h('td', { staticClass: this.cellClass }, [ slot ])
  },
  methods: {
    processSlot (name, props, fallback) {
      const slot = this.$scopedSlots[name]
      return slot
        ? slot.call(this._renderProxy, props)
        : fallback
    },
    joinClasses (...classes) {
      const isNotEmpty = className => className
      return classes.filter(isNotEmpty).join(' ')
    }
  }
}
