import { includes, castArray } from 'vuikit/src/_core/utils/lang'

export default {
  props: {
    selection: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    select (items) {
      this.$emit('update:selection', [...this.selection, ...castArray(items)])
    },
    unselect (items) {
      const selection = [...this.selection]
      castArray(items).forEach(item =>
        selection.splice(selection.indexOf(item), 1)
      )

      this.$emit('update:selection', selection)
    },
    toggleSelection (item) {
      this.isSelected(item) ? this.unselect(item) : this.select(item)
    },
    isSelected (items) {
      return castArray(items).every(item => includes(this.selection, item))
    }
  }
}
