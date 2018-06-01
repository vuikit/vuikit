import { assign, isFunction } from 'vuikit/src/_core/utils/lang'

import MixinSort from './mixins/sort'
import MixinSelect from './mixins/select'

import { ElTable, ElTableTr } from './elements'

export default {
  mixins: [ MixinSelect, MixinSort ],
  props: assign({}, ElTable.props, {
    data: {
      type: Array, // [{ ...row }, ]
      required: true
    },
    columns: {
      type: Array, // [{ headRender, cellRender, context }, ]
      required: true
    },
    divided: {
      default: true
    },
    rowClass: {
      type: Function
    },
    headless: {
      type: Boolean,
      default: false
    }
  }),
  methods: {
    resolveRowClass (row) {
      return isFunction(this.rowClass)
        ? this.rowClass(row)
        : this.rowClass
    }
  },
  render (h) {
    const instance = this
    const { data } = this.$props
    const isIgnoredTag = tag => /^(A|BUTTON)$/.test(tag)

    return h(ElTable, { props: this.$props }, [

      // HEAD
      this.$props.headless || h('thead', [
        h(ElTableTr, [
          this.columns.map(col => col.headRender(h, col.context))
        ])
      ]),

      // BODY
      h('tbody', [
        data.map(row =>
          h(ElTableTr, {
            props: {
              active: instance.isRowSelected(row)
            },
            class: instance.resolveRowClass(row),
            on: {
              click: e => {
                if (!isIgnoredTag(e.target.tagName)) {
                  instance.toggleRowSelection(row)
                }
              }
            }
          }, [
            this.columns.map(col => col.cellRender(h, assign({ row }, col.context)))
          ])
        )
      ])
    ])
  }
}
