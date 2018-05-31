import { assign } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { ElTable, ElTableTr } from './elements'

export default {
  functional: true,
  props: assign({}, ElTable.props, {
    data: {
      type: Array,
      required: true
    },
    headless: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array, // [{ cellRender: fn, headRender: fn, context: { data, parent } }]
      required: true,
      validator: val => val.every(col => col.headRender && col.cellRender && col.context)
    },
    row: {
      type: Function,
      default: (h, { children }) => h(ElTableTr, children)
    }
  }),
  render (h, { data, props }) {

    return h(ElTable, mergeData(data, { props }), [

      // HEAD
      props.headless || h('thead', [
        h(ElTableTr, [
          ...props.columns.map(col => col.headRender(h, getCellContext({ col })))
        ])
      ]),

      // BODY
      h('tbody', [
        ...props.data.map(row =>
          h({ functional: true, render: props.row }, { row }, [
            ...props.columns.map(col => col.cellRender(h, getCellContext({ col, row })))
          ])
        )
      ])

    ])
  }
}

function getCellContext ({ col, row }) {
  const data = col.context.data || {}

  return {
    row,
    data,
    parent: col.context.parent,
    props: data.props || {},
    listeners: data.on || {},
    // slots are expected to be a function,
    // but as those are the same for each cell
    // we are just returning a pre resolved ones
    slots: () => data.slots || {}
  }
}
