import { select, unselect, isSelected } from 'vuikit/src/_core/helpers/selection'

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
      this.updateRowSelection(
        select(this.selectedRows, this.getSelectionRowId(row))
      )
    },
    unselectRow (row) {
      this.updateRowSelection(
        unselect(this.selectedRows, this.getSelectionRowId(row))
      )
    },
    toggleRowSelection (row) {
      this.isRowSelected(row) ? this.unselectRow(row) : this.selectRow(row)
    },
    toggleRowsSelection () {
      let selectedRows = []

      if (!this.allRowsSelected) {
        selectedRows = this.data.map(row => this.getSelectionRowId(row))
      }

      this.updateRowSelection(selectedRows)
    },
    isRowSelected (row) {
      return isSelected(this.selectedRows, this.getSelectionRowId(row))
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
