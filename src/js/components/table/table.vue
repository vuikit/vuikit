<template>
  <table class="uk-table">
    <slot></slot>
    <thead>
      <tr>
        <column-headers></column-headers>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data"
        :class="getRowClass(row)"
        @click="e => emitClickRow(e, row)">
        <row-cells :row="row"></row-cells>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { isFunction } from 'src/js/util/index'

export default {
  name: 'VkTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    sortedBy: {
      type: Object,
      default: () => ({}) // { field: [asc|desc] }
    },
    rowClass: [String, Function]
  },
  data: () => ({
    columns: []
  }),
  components: {
    ColumnHeaders: {
      functional: true,
      render (h, { parent }) {
        return parent.columns.map(col =>
          col._headerRender && col._headerRender.call(col._renderProxy)
        )
      }
    },
    RowCells: {
      functional: true,
      props: ['row'],
      render (h, { parent, props }) {
        const { row } = props
        return parent.columns.map(col =>
          col._cellRender && col._cellRender.call(col._renderProxy, { row })
        )
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
</script>
