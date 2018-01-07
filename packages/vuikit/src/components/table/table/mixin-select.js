import { includes } from 'vuikit/core/util'

export default {
  methods: {
    select (row) {
      const id = row._vk_id

      if (this.singleSelectable) {
        this.updateSelection([id])
        return
      }

      const selectedRows = [...this.selectedRows]

      selectedRows.push(id)
      this.updateSelection(selectedRows)
    },
    unselect (row) {
      const id = row._vk_id
      const index = this.selectedRows.indexOf(id)
      const selectedRows = [...this.selectedRows]

      selectedRows.splice(index, 1)
      this.updateSelection(selectedRows)
    },
    toggleSelection (row) {
      this.isSelected(row)
        ? this.unselect(row)
        : this.select(row)
    },
    toggleSelectionAll () {
      let selectedRows = []

      if (!this.allRowsSelected) {
        selectedRows = this.rows.map(row => row._vk_id)
      }

      this.updateSelection(selectedRows)
    },
    isSelected (row) {
      return includes(this.selectedRows, row._vk_id)
    },
    updateSelection (selectedRows) {
      this.$emit('update:selectedRows', selectedRows)
    }
  },
  computed: {
    allRowsSelected () {
      if (this.selectedRows.length < this.rows.length) {
        return false
      }

      const selected = this.rows.filter(this.isSelected)

      return selected.length === this.rows.length
    }
  },
  created () {
    if (this.rowSelectable) {
      this.$on('click-row', this.toggleSelection)
    }
  }
}
