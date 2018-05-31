import { get } from 'vuikit/src/_core/utils/misc'
import { assign, isFunction } from 'vuikit/src/_core/utils/lang'

import TableRender from './render'
import { ElTable, ElTableTr } from './elements'

export default {
  inheritAttrs: false,
  props: assign({}, ElTable.props, {
    data: TableRender.props.data,
    headless: TableRender.props.headless,
    rowClass: {
      type: Function
    }
  }),
  computed: {
    columns: {
      get () {
        return get(this, '$slots.default', [])
          .filter(n => n.tag)
          .map(n => ({
            headRender: n.fnOptions.headRender,
            cellRender: n.fnOptions.cellRender,
            context: { data: n.data, parent: this }
          }))
      },
      cache: false
    }
  },
  methods: {
    resolveRowClass (row) {
      return isFunction(this.rowClass)
        ? this.rowClass(row)
        : this.rowClass
    }
  },
  render (h) {
    return h(TableRender, {
      attrs: this.$attrs,
      props: assign({}, this.$props, {
        columns: this.columns,
        row (h, { data, children, parent }) {
          return h(ElTableTr, {
            class: parent.resolveRowClass(data.row)
          }, children)
        }
      })
    })
  }
}
