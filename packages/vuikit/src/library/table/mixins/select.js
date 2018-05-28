import { ROW_ID, ON_CLICK_ROW, UPDATE_SELECTEDROWS } from '../constants'

export default {
  props: {
    selectedRows: {
      type: Array,
      default: () => []
    },
    rowSelectable: {
      type: Boolean,
      default: false
    },
    rowsSelectable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectRow (row) {
      const id = row[ROW_ID]

      if (this.rowSelectable) {
        this.updateRowSelection([id])
        return
      }

      const selectedRows = [...this.selectedRows]

      selectedRows.push(id)
      this.updateRowSelection(selectedRows)
    },
    unselectRow (row) {
      const id = row[ROW_ID]
      const index = this.selectedRows.indexOf(id)
      const selectedRows = [...this.selectedRows]

      selectedRows.splice(index, 1)
      this.updateRowSelection(selectedRows)
    },
    toggleRowSelection (row) {
      this.isRowSelected(row)
        ? this.unselectRow(row)
        : this.selectRow(row)
    },
    toggleRowsSelection () {
      let selectedRows = []

      if (!this.allRowsSelected) {
        selectedRows = this.rows.map(row => row[ROW_ID])
      }

      this.updateRowSelection(selectedRows)
    },
    isRowSelected (row) {
      return Boolean(this.selectedRows
        .filter(id => JSON.stringify(id) === JSON.stringify(row[ROW_ID])).length)
    },
    updateRowSelection (selectedRows) {
      this.$emit(UPDATE_SELECTEDROWS, selectedRows)
    }
  },
  computed: {
    allRowsSelected () {
      if (this.selectedRows && this.selectedRows.length < this.rows.length) {
        return false
      }

      const selected = this.rows.filter(this.isRowSelected)
      return selected.length === this.rows.length
    }
  },
  created () {
    if (this.rowsSelectable || this.rowSelectable) {
      this.$on(ON_CLICK_ROW, this.toggleRowSelection)
    }
  }
}
