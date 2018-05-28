import { assign } from 'vuikit/src/util/lang'

import Table from './table'
import Render from '../render/table'
import { UPDATE_EXPANDEDROWS, ROW_ID, ROW_LEVEL, ROW_CHILDREN_COUNT } from '../constants'

export default {
  name: 'VkTableTree',
  extends: Table,
  props: {
    expandedRows: {
      type: Array,
      default: () => []
    },
    childrenKey: {
      type: String,
      default: 'children'
    }
  },
  computed: {
    rows () {
      const rows = []

      const flatten = (data, parent = {}) => {
        let idCount = 0

        data.forEach(_row => {
          const row = assign({}, _row)
          const children = row[this.childrenKey]
          const hasChildren = children && children.length

          row[ROW_LEVEL] = parent[ROW_LEVEL] !== undefined
            ? parent[ROW_LEVEL] + 1
            : 0

          row[ROW_ID] = row[this.rowKey]
            ? row[this.rowKey]
            : row[ROW_LEVEL] === 0
              ? `${idCount++}`
              : `${parent[ROW_ID]}_${idCount++}`

          rows.push(row)

          if (hasChildren && this.isExpanded(row)) {
            flatten(children, row)
          }

          if (hasChildren) {
            row[ROW_CHILDREN_COUNT] = children.length
            delete row[this.childrenKey]
          }
        })
      }

      flatten(this.data)

      return rows
    },
    thereAreSubLevels () {
      return this.rows.some(row => row[ROW_CHILDREN_COUNT])
    }
  },
  methods: {
    isExpanded (row) {
      return Boolean(this.expandedRows
        .filter(id => JSON.stringify(id) === JSON.stringify(row[ROW_ID])).length)
    },
    toggleExpand (row) {
      const id = row[ROW_ID]
      const expandedRows = [...this.expandedRows]
      const index = expandedRows.indexOf(id)
      const isExpanded = index !== -1

      isExpanded
        ? expandedRows.splice(index, 1)
        : expandedRows.push(id)

      this.$emit(UPDATE_EXPANDEDROWS, expandedRows)
    }
  },
  render (h) {
    const columns = (this.$slots.default || []).filter(n => n.tag)

    return Render(h, {
      columns,
      table: this,
      rows: this.rows,
      props: this.$props
    })
  }
}
