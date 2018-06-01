import { assign } from 'vuikit/src/_core/utils/lang'

export default {
  props: {
    sortedBy: {
      type: Object
    }
  },
  methods: {
    sortBy (cell, multi) {
      // if multi keep other keys in place
      const sortedBy = multi ? assign({}, this.sortedBy) : {}

      // toggle order
      sortedBy[cell] = this.sortedBy[cell] === 'asc' ? 'desc' : 'asc'

      // emit update
      this.$emit('update:sortedBy', sortedBy)
    }
  }
}
