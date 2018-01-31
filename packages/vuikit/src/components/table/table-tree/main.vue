<script>
import { Table } from '../'
import { includes, merge } from 'vuikit/core/util/lang'

export default {
  name: 'TableTree',
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
        let idCount = 1

        data.forEach(_row => {
          const row = merge({}, _row)
          const children = row[this.childrenKey]
          const hasChildren = children && children.length

          row._vk_level = parent._vk_level !== undefined
            ? parent._vk_level + 1
            : 0

          row._vk_id = row[this.rowKey]
            ? row[this.rowKey]
            : row._vk_level === 0
              ? `${idCount++}`
              : `${parent._vk_id}_${idCount++}`

          rows.push(row)

          if (hasChildren && this.isExpanded(row)) {
            flatten(children, row)
          }

          if (hasChildren) {
            row._vk_childrenCount = children.length
            delete row[this.childrenKey]
          }
        })
      }

      flatten(this.data)

      return rows
    },
    thereAreSubLevels () {
      return this.rows.some(row => row._vk_childrenCount)
    }
  },
  methods: {
    isExpanded (row) {
      return includes(this.expandedRows, row._vk_id)
    },
    toggleExpand (row) {
      const id = row._vk_id
      const expandedRows = [...this.expandedRows]
      const index = expandedRows.indexOf(id)
      const isExpanded = index !== -1

      isExpanded
        ? expandedRows.splice(index, 1)
        : expandedRows.push(id)

      this.$emit('update:expandedRows', expandedRows)
    }
  }
}
</script>
