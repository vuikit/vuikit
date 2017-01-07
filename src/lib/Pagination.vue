<template>
  <ul class="uk-pagination" :class="{
    'uk-pagination-left': align === 'left',
    'uk-pagination-right': align === 'right'
  }">
    <!-- prev buttons -->
    <li :class="{
      'uk-disabled': !prevPage,
      'uk-pagination-previous': !compact
    }">
      <a v-if="prevPage" @click.prevent="emitChange({ page: 1 })">
        <i class="uk-icon-angle-double-left" />
      </a>
      <span v-else><i class="uk-icon" /></span>
      <a v-if="prevPage" @click.prevent="emitChange({ page: prevPage })">
        <i class="uk-icon-angle-left" />
      </a>
      <span v-else><i class="uk-icon" /></span>
    </li>
    <!-- pre pages -->
    <li v-for="page in prePages" :class="{ 'uk-active': page === activePage }">
      <span v-if="page === activePage" v-text="page" />
      <a v-else
        @click.prevent="emitChange({ page })"
        v-text="page" />
    </li>
    <li v-if="mainPages[0] > (prePages.length + 1)">
      <span>...</span>
    </li>
    <!-- main pages -->
    <li v-for="page in mainPages" :class="{ 'uk-active': page === activePage }">
      <span v-if="page === activePage" v-text="page" />
      <a v-else
        @click.prevent="emitChange({ page })"
        v-text="page" />
    </li>
    <li v-if="(mainPages[mainPages.length - 1] + 1) < postPages[0]">
      <span>...</span>
    </li>
    <!-- post pages -->
    <li v-for="page in postPages" :class="{ 'uk-active': page === activePage }">
      <span v-if="page === activePage" v-text="page" />
      <a v-else
        @click.prevent="emitChange({ page })"
        v-text="page" />
    </li>
    <!-- next buttons -->
    <li :class="{
      'uk-disabled': !nextPage,
      'uk-pagination-next': !compact
    }">
      <a v-if="nextPage" @click.prevent="emitChange({ page: nextPage })">
        <i class="uk-icon-angle-right" />
      </a>
      <span v-else><i class="uk-icon" /></span>
      <a v-if="nextPage" @click.prevent="emitChange({ page: totalPages })">
        <i class="uk-icon-angle-double-right" />
      </a>
      <span v-else><i class="uk-icon" /></span>
    </li>
  </ul>
</template>

<script>
import { range } from 'helpers/util'

export default {
  name: 'VkPagination',
  props: {
    activePage: {
      type: Number,
      default: 1
    },
    // total amount of items
    total: {
      type: Number,
      required: true
    },
    // items displayed on each page
    limit: {
      type: Number,
      default: 10
    },
    // amount of visible pages around active one
    pageRange: {
      type: Number,
      default: 2
    },
    // left or right, defaults to center
    align: {
      type: String,
      default: ''
    },
    // wheter next/prev should compact or expand
    compact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    prevPage () {
      return (this.activePage - 1) !== 0
        ? this.activePage - 1
        : null
    },
    nextPage () {
      return (this.activePage + 1) <= this.totalPages
        ? this.activePage + 1
        : null
    },
    totalPages () {
      return Math.ceil(this.total / this.limit)
    },
    mainPages () {
      let start = this.activePage - this.pageRange
      let end = this.activePage + this.pageRange
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
    emitChange (changes) {
      const state = {
        ...{
          page: this.activePage,
          total: this.total,
          limit: this.limit
        },
        ...changes
      }
      // calculate since new state
      state.offset = (state.page - 1) * state.limit + 1
      state.to = Math.min(state.total, state.page * state.limit)
      // event
      this.$emit('change', state)
    }
  }
}
</script>
