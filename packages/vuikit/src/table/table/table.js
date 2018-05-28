import { get } from 'vuikit/src/_core/utils/misc'
import { warn } from 'vuikit/src/_core/utils/debug'
import { assign, isFunction } from 'vuikit/src/_core/utils/lang'

import MixinSort from './mixins/sort'
import MixinSelect from './mixins/select'

import { ElTable, ElTableTr } from '../elements'
import { ROW_ID, ON_CLICK_ROW, ROW_CLICK_PREVENTED } from '../constants'

export default {
  name: 'VkTable',
  mixins: [ MixinSelect, MixinSort ],
  inheritAttrs: false,
  props: assign({}, ElTable.props, {
    data: {
      type: Array,
      required: true
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    rowClass: {
      type: Function
    },
    headless: {
      type: Boolean,
      default: false
    }
  }),
  computed: {
    // using computed rows allows components
    // extending this table to alter the data
    rows () {
      return this.data.map((_row, index) => {
        const row = assign({}, _row)
        row[ROW_ID] = row[this.rowKey] || index
        return row
      })
    },
    columns: {
      get () {
        // using slots directly because $children order
        // doesn't reflect the real columns order
        let columns = get(this, '$slots.default', [])

        // filter out invalid columns
        columns = this.filterColumns(columns)

        return columns
      },
      cache: false
    }
  },
  methods: {
    filterColumns (columns) {
      return columns
        .filter(n => n.tag)
        .filter(node => {
          const isValid = get(node, 'fnOptions.headRender') && get(node, 'fnOptions.cellRender')

          if (process.env.NODE_ENV !== 'production' && !isValid) {
            warn(`vk-table -> '${node.tag}' column was filtered out because it's missing a head and/or cell render function.`)
          }

          return isValid
        })
    },
    getCellContext (col) {
      const data = col.data || {}

      return {
        data,
        parent: this,
        props: data.props || {},
        listeners: data.on || {},
        slots: () => data.slots || {} // pre resolved by the column render
      }
    }
  },
  render (h) {
    const props = this.$props

    return h(ElTable, { props }, [
      // HEAD
      props.headless || h('thead', [
        h(ElTableTr, [
          ...this.columns.map(col => col.fnOptions.headRender(h, this.getCellContext(col)))
        ])
      ]),
      // BODY
      h('tbody', [
        ...this.rows.map((row, index) =>
          h(Row, { row }, [
            ...this.columns.map(col => col.fnOptions.cellRender(h, assign({ row }, this.getCellContext(col))))
          ])
        )
      ])
    ])
  }
}

function resolveClass (rowClass, row) {
  return isFunction(rowClass)
    ? rowClass(row)
    : rowClass
}

const Row = {
  functional: true,
  render (h, { data, children, parent }) {
    const { row } = data

    return h(ElTableTr, {
      props: {
        active: parent.isRowSelected(row)
      },
      class: resolveClass(parent.rowClass, row),
      on: {
        click: e => {
          const isPrevented = e[ROW_CLICK_PREVENTED]
          const isIgnoredTag = /^(A|BUTTON)$/.test(e.target.tagName)

          if (isPrevented || isIgnoredTag) {
            return
          }

          parent.$emit(ON_CLICK_ROW, row)
        }
      }
    }, children)
  }
}
