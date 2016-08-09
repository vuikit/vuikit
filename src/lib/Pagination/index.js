import { merge, range } from 'lodash'
import render from './render'

export default {
  name: 'VkPagination',
  render,
  props: {
    // total items
    total: {
      type: Number,
      required: true
    },
    // items on each page
    limit: {
      type: Number,
      default: 10
    },
    // current page
    current: {
      type: Number,
      default: 1
    },
    // amount of pages around current one
    pageRange: {
      type: Number,
      default: 2
    },
    // left or right, defaults to center
    align: {
      type: String,
      default: ''
    },
    // toggle next/prev buttons float
    compact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    from () {
      return (this.current - 1) * this.limit + 1
    },
    to () {
      return Math.min(this.total, this.current * this.limit)
    },
    prevPage () {
      return (this.current - 1) !== 0
        ? this.current - 1
        : null
    },
    nextPage () {
      return (this.current + 1) <= this.totalPages
        ? this.current + 1
        : null
    },
    totalPages () {
      return Math.ceil(this.total / this.limit)
    },
    mainPages () {
      let start = this.current - this.pageRange
      let end = this.current + this.pageRange
      if (end > this.totalPages) {
        end = this.totalPages
        start = this.totalPages - this.pageRange * 2
        start = start < 1 ? 1 : start
      }
      if (start <= 1) {
        start = 1
        end = Math.min(this.pageRange * 2 + 1, this.totalPages)
      }
      return range(start, end + 1)
    },
    prePages () {
      return range(1,
        this.mainPages[0] <= 3
          ? this.mainPages[0]
          : 2
      )
    },
    postPages () {
      const mainLast = this.mainPages[this.mainPages.length - 1]
      return range(
        mainLast >= this.totalPages - 2
          ? mainLast + 1
          : this.totalPages,
        this.totalPages + 1
      )
    }
  },
  methods: {
    change (changes) {
      const state = merge({
        current: this.current,
        total: this.total,
        limit: this.limit
      }, changes)
      // calculate since new state
      state.from = (state.current - 1) * state.limit + 1
      state.to = Math.min(state.total, state.current * state.limit)
      // event
      this.$emit('change', state)
    }
  }
}
