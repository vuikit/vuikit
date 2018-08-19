export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    prevPage () {
      return this.page - 1
    },
    nextPage () {
      return this.page + 1
    },
    lastPage () {
      return this.pages[this.pages.length - 1]
    },
    totalPages () {
      return Math.ceil(this.total / this.perPage)
    },
    lastPageItemsCount () {
      return this.total % this.perPage
    }
  }
}
