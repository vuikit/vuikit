import cloneArray from '@vuikit/core/utils/clone-array'

export default {
  props: {
    selection: {
      type: Array,
      default: () => []
    },
    select: {
      type: Boolean,
      default: false
    },
    selectSingle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isSelected (row) {
      return this.selection.findIndex(r => r.id === row.id) !== -1
    },
    selectRow (row) {
      const newSelection = cloneArray(this.selection)
      newSelection.push(row)
      this.updateSelection(newSelection)
    },
    unselectRow (row) {
      const index = this.selection.indexOf(row)
      const newSelection = cloneArray(this.selection)
      newSelection.splice(index, 1)

      this.updateSelection(newSelection)
    },
    toggleSelection (row) {
      this.isSelected(row)
        ? this.unselectRow(row)
        : this.selectRow(row)
    },
    updateSelection (selection) {
      this.$emit('update:selection', selection)
    }
  },
  created () {
    this.$on('click-row', row => {
      if (this.selectSingle) {
        this.updateSelection([row])
      } else if (this.select) {
        this.toggleSelection(row)
      }
    })
  }
}
