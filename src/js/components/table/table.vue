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
  mounted () {
    // forced rerendering required for cells
    this.$forceUpdate()
  },
  components: {
    RowCells: {
      functional: true,
      props: ['row'],
      render (h, { parent, props }) {
        const { row } = props
        return parent.getColumns().map(col => {
          const compCellRender = col.$vnode.componentOptions.Ctor.options.cellRender
          const cellRender = compCellRender || defaultCellRender
          return cellRender.call(col, h, row)
        })
      }
    }
  },
  methods: {
    getColumns () {
      const slots = this.$slots.default
      return slots.filter(c => c.tag).map((node, index) => {
        if (node.key === undefined) {
          return this.$children[index]
        } else {
          const itHasSameKey = child => child.$vnode.key === node.key
          return this.$children.find(itHasSameKey)
        }
      }).filter(c => c)
    },
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
  const scoped = this.$scopedSlots.default
  return h('td', {
    staticClass: this.cellClass
  }, [
    scoped
      ? scoped.call(this, row)
      : get(row, this.cell, '')
  ])
}
</script>
