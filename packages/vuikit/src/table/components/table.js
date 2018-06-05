import { assign, isFunction } from 'vuikit/src/_core/utils/lang'

import core from '../core'
import { ElTable, ElTableTr } from '../elements'
import { mixinSelect, mixinSort } from '../mixins'

export default {
  name: 'VkTable',
  extends: core,
  mixins: [mixinSelect, mixinSort],
  props: {
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
  },
  computed: {
    columns: {
      get () {
        return (this.$slots.default || []).filter(n => n.tag).map(this.mapColumnNode)
      },
      cache: false
    }
  },
  methods: {
    resolveRowClass (row) {
      return isFunction(this.rowClass)
        ? this.rowClass(row)
        : this.rowClass
    },
    mapColumnNode (node) {
      const data = node.data || {}

      return {
        headRender: node.fnOptions.headRender,
        cellRender: node.fnOptions.cellRender,
        context: {
          data,
          parent: this,
          props: data.props || {},
          listeners: data.on || {},
          // slots are expected to be a function,
          // but as those are the same for each cell
          // we are just returning a pre resolved ones
          slots: () => data.slots || {}
        }
      }
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
