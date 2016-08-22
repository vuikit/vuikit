import { range } from 'lodash'
import { merge } from '../../helpers/util'
import render from './render'

export default {
  name: 'VkPagination',
  render,
  props: {
    // displayed page
    page: {
      type: Number,
      default: 1
    },
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
    prevPage () {
      return (this.page - 1) !== 0
        ? this.page - 1
        : null
    },
    nextPage () {
      return (this.page + 1) <= this.totalPages
        ? this.page + 1
        : null
    },
    totalPages () {
      return Math.ceil(this.total / this.limit)
    },
    mainPages () {
      let start = this.page - this.pageRange
      let end = this.page + this.pageRange
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
        page: this.page,
        total: this.total,
        limit: this.limit
      }, changes)
      // calculate since new state
      state.offset = (state.page - 1) * state.limit + 1
      state.to = Math.min(state.total, state.page * state.limit)
      // event
      this.$emit('change', state)
    }
  }
}
