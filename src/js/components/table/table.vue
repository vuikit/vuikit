<template>
  <table class="uk-table">
    <thead>
      <tr>
        <slot></slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data"
        :class="getRowClass(row)"
        @click="e => emitClickRow(e, row)">
        <row-cells :row="row"></row-cells>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { isFunction, get } from 'src/js/util/index'

export default {
  name: 'VkTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    rowClass: [String, Function],
    // column-sort related
    sortedBy: {
      type: Object,
      default: () => ({}) // { field: [asc|desc] }
    },
    selection: Array
  },
  data: () => ({
    children: []
  }),
  computed: {
    columns: {
      get () {
        return this.$slots.default
          .filter(c => c.tag)
          .map((node, index) => {
            if (node.key === undefined) {
              return this.children[index]
            } else {
              const itHasSameKey = child => child.$vnode.key === node.key
              return this.children.find(itHasSameKey)
            }
          })
          .filter(c => c)
      },
      cache: false
    }
  },
  mounted () {
    // required for reactivity
    this.children = this.$children
  },
  components: {
    RowCells: {
      functional: true,
      props: ['row'],
      render (h, { parent, props }) {
        const { row } = props

        return parent.columns
          .map(col => {
            const compCellRender = col.$vnode.componentOptions.Ctor.options.cellRender
            const cellRender = compCellRender || defaultCellRender
            return cellRender.call(col, h, row)
          })
      }
    }
  },
  methods: {
    getRowClass (row, index) {
      return (isFunction(this.rowClass))
        ? this.rowClass(row, index)
        : this.rowClass
    },
    emitClickRow (e, row) {
      const noChildWasClicked = e.target.tagName === 'TR' || e.target.tagName === 'TD'
      if (noChildWasClicked) {
        this.$emit('click-row', row)
      }
    }
  }
}

function defaultCellRender (h, row) {
  const scopedFn = this.$scopedSlots.default
  return h('td', {
    staticClass: this.cellClass
  }, [
    scopedFn
      ? scopedFn.length === 2
        ? scopedFn.call(this, h, row)
        : scopedFn.call(this, row)
      : get(row, this.cell, '')
  ])
}
</script>
