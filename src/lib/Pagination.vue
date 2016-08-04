<template>
  <ul class="uk-pagination"
    :class="{
      'uk-pagination-left': align === 'left',
      'uk-pagination-right': align === 'right'
    }">
    <li :class="{
      'uk-disabled': !prevPage,
      'uk-pagination-previous': !compact
    }">
      <!-- firstPage -->
      <a href="" v-if="prevPage"
        @click.prevent="change({ current: 1 })">
        <i class="uk-icon-angle-double-left"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-double-left"></i>
      </span>
      <!-- prevPage -->
      <a href="" v-if="prevPage"
        @click.prevent="change({ current: prevPage })">
        <i class="uk-icon-angle-left"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-left"></i>
      </span>
    </li>
    <li v-for="page in prePages"
      :class="{
        'uk-active': page === current
      }">
      <span v-if="page === current" v-text="page"></span>
      <a v-else
        href=""
        v-text="page"
        @click.prevent="change({ current: page })">
      </a>
    </li>
    <li v-if="mainPages[0] > (prePages.length + 1)">
      <span>...</span>
    </li>
    <li v-for="page in mainPages"
      :class="{
        'uk-active': page === current
      }">
      <span v-if="page === current" v-text="page"></span>
      <a v-else
        href=""
        @click.prevent="change({ current: page })"
        v-text="page">
      </a>
    </li>
    <li v-if="(mainPages[mainPages.length - 1] + 1) < postPages[0]">
      <span>...</span>
    </li>
    <li v-for="page in postPages"
      :class="{
        'uk-active': page === current
      }">
      <span v-if="page === current">
        {{ page }}
      </span>
      <a v-else
        href=""
        v-text="page"
        @click.prevent="change({ current: page })">
      </a>
    </li>
    <li :class="{
      'uk-disabled': !nextPage,
      'uk-pagination-next': !compact
    }">
      <!-- nextPage -->
      <a href="" v-if="nextPage"
        @click.prevent="change({ current: nextPage })">
        <i class="uk-icon-angle-right"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-right"></i>
      </span>
      <!-- last page -->
      <a href="" v-if="nextPage"
        @click.prevent="change({ current: totalPages })">
        <i class="uk-icon-angle-double-right"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-double-right"></i>
      </span>
    </li>
  </ul>
</template>

<script>
import { merge, range } from 'lodash'

export default {
  name: 'VkPagination',
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
</script>
