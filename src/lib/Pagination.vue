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
        @click.prevent="current = 1">
        <i class="uk-icon-angle-double-left"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-double-left"></i>
      </span>
      <!-- prevPage -->
      <a href="" v-if="prevPage"
        @click.prevent="current = prevPage">
        <i class="uk-icon-angle-left"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-left"></i>
      </span>
    </li>
    <li v-for="page in prePages"
      :class="{'uk-active': page === current}">
      <!-- content -->
      <span v-if="page === current" v-text="page"></span>
      <a href="" v-else
        @click.prevent="current = page"
        v-text="page">
      </a>
    </li>
    <li v-if="edges < interval.start && (interval.start - edges != 1)">
      <span>...</span>
    </li>
    <li
      v-for="page in pages"
      :class="{'uk-active': page === current}">
      <!-- content -->
      <span v-if="page === current" v-text="page"></span>
      <a v-else
        href=""
        @click.prevent="current = page"
        v-text="page">
      </a>
    </li>
    <li v-if="totalPages - edges > interval.end
      && (totalPages - edges - interval.end != 1)">
      <span>...</span>
    </li>
    <li v-for="page in postPages"
      :class="{'uk-active': page === current}">
      <!-- content -->
      <span v-if="page === current">
        {{ page }}
      </span>
      <a href="" v-else
        @click.prevent="current = page"
        v-text="page">
      </a>
    </li>
    <li :class="{
      'uk-disabled': !nextPage,
      'uk-pagination-next': !compact
    }">
      <!-- nextPage -->
      <a href="" v-if="nextPage"
        @click.prevent="current = nextPage">
        <i class="uk-icon-angle-right"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-right"></i>
      </span>
      <!-- last page -->
      <a href="" v-if="nextPage"
        @click.prevent="current = totalPages">
        <i class="uk-icon-angle-double-right"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-double-right"></i>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VkPagination',
  props: {
    // left or right, defaults to center
    align: {
      type: String,
      default: ''
    },
    // next/prev btns position
    compact: {
      type: Boolean,
      default: false
    },
    // current page
    current: {
      type: Number,
      default: 1
    },
    // max number of edge pages
    edges: {
      type: Number,
      default: 3
    },
    // total number of Items
    items: {
      type: Number,
      default: 1
    },
    // items for each page
    itemsOnPage: {
      type: Number,
      default: 1
    },
    // max numer of displayed pages
    visiblePages: {
      type: Number,
      default: 3
    }
  },
  computed: {
    index: function () {
      return this.current - 1
    },
    prevPage: function () {
      return (this.current - 1) !== 0
        ? this.current - 1
        : null
    },
    nextPage: function () {
      return (this.current + 1) <= this.totalPages
        ? this.current + 1
        : null
    },
    lastPage: function () {
      return this.totalPages - 1
    },
    totalPages: function () {
      return Math.ceil(this.items / this.itemsOnPage)
        ? Math.ceil(this.items / this.itemsOnPage)
        : 1
    },
    interval: function () {
      var pages = this.totalPages
      var halfDisplayed = this.visiblePages / 2
      return {
        start: Math.ceil(this.index > halfDisplayed
          ? Math.max(Math.min(
              this.index - halfDisplayed, (pages - this.visiblePages)
            ), 0)
          : 0),

        end: Math.ceil(this.index > halfDisplayed
          ? Math.min(this.index + halfDisplayed, pages)
          : Math.min(this.visiblePages, pages))
      }
    },
    pages: function () {
      var pages = []
      var interval = this.interval
      var i
      for (i = interval.start; i < interval.end; i++) {
        pages.push(i + 1)
      }
      return pages
    },
    prePages: function () {
      var pages = []
      var interval = this.interval
      var edges = this.edges
      var end = Math.min(edges, interval.start)
      var i
      if (interval.start > 0 && edges > 0) {
        for (i = 0; i < end; i++) {
          pages.push(i + 1)
        }
      }
      return pages
    },
    postPages: function () {
      var pages = []
      var totalPages = this.totalPages
      var interval = this.interval
      var edges = this.edges
      var begin = Math.max(totalPages - edges, interval.end)
      var i
      if (interval.end < totalPages && edges > 0) {
        for (i = begin; i < totalPages; i++) {
          pages.push(i + 1)
        }
      }
      return pages
    }
  },
  watch: {
    current: function (page) {
      this.$dispatch('change', page)
    }
  }
}
</script>
