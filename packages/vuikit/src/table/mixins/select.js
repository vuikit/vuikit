export default {
  props: {
    rowKey: {
      type: String,
      default: 'id'
    },
    selectedRows: {
      type: Array,
      default: () => []
    },
    selectable: {
      type: [Boolean, String],
      default: false,
      validator: v => !v || /single/.test(v) || v === true
    }
  },
  methods: {
    selectRow (row) {
      const id = row[this.rowKey]

      if (!this.selectable) {
        return
      }

      if (this.selectable === 'single') {
        this.updateRowSelection([id])
        return
      }

      const selectedRows = [...this.selectedRows]

      selectedRows.push(id)
      this.updateRowSelection(selectedRows)
    },
    unselectRow (row) {
      const id = row[this.rowKey]
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
        selectedRows = this.data.map(row => row[this.rowKey])
      }

      this.updateRowSelection(selectedRows)
    },
    isRowSelected (row) {
      return Boolean(this.selectedRows
        .filter(id => JSON.stringify(id) === JSON.stringify(row[this.rowKey])).length)
    },
    updateRowSelection (selectedRows) {
      this.$emit('update:selectedRows', selectedRows)
    }
  },
  computed: {
    allRowsSelected () {
      if (this.selectedRows && this.selectedRows.length < this.data.length) {
        return false
      }

      const selected = this.data.filter(this.isRowSelected)
      return selected.length === this.data.length
    }
  }
}
