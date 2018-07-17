import { includes } from 'vuikit/src/_core/utils/lang'

export default {
  props: {
    selectedRows: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getSelectionRowId (row) {
      return row['id']
    },
    selectRow (row) {
      this.updateRowSelection([...this.selectedRows, this.getSelectionRowId(row)])
    },
    unselectRow (row) {
      const id = this.getSelectionRowId(row)
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
        selectedRows = this.data.map(row => this.getSelectionRowId(row))
      }

      this.updateRowSelection(selectedRows)
    },
    isRowSelected (row) {
      return includes(this.selectedRows, this.getSelectionRowId(row))
    },
    updateRowSelection (selectedRows) {
      this.$emit('update:selectedRows', selectedRows)
    }
  },
  computed: {
    allRowsSelected () {
      if (this.selectedRows.length < this.data.length) {
        return false
      }

      const selected = this.data.filter(this.isRowSelected)
      return selected.length === this.data.length
    }
  }
}
