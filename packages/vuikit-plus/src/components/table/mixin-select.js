import cloneArray from '@vuikit/core/utils/clone-array'

export default {
  methods: {
    isSelected (row) {
      return this.selection.findIndex(r => r.id === row.id) !== -1
    },
    updateSelection (selection) {
      this.$emit('update:selection', selection)
    },
    doSelect (row) {
      if (this.singleSelectable) {
        this.updateSelection([row])
        return
      }

      const newSelection = cloneArray(this.selection)
      newSelection.push(row)

      this.updateSelection(newSelection)
    },
    doUnselect (row) {
      const index = this.selection.indexOf(row)
      const newSelection = cloneArray(this.selection)
      newSelection.splice(index, 1)

      this.updateSelection(newSelection)
    },
    toggleSelectionAll () {
      const newSelection = this.allIsSelected
        ? []
        : cloneArray(this.data)

      this.updateSelection(newSelection)
    },
    toggleSelection (row) {
      this.isSelected(row)
        ? this.doUnselect(row)
        : this.doSelect(row)
    }
  },
  computed: {
    allIsSelected () {
      if (this.selection.length < this.data.length) {
        return false
      }

      const selected = this.data.filter(this.isSelected)

      return selected.length === this.data.length
    }
  },
  created () {
    if (this.rowSelectable) {
      this.$on('click-row', this.toggleSelection)
    }
  }
}
