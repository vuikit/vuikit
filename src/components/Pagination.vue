<template>
  <ul class="uk-pagination">
    <li :class="{'uk-disabled': !prevPage}">
      <a v-if="prevPage" href="" @click.prevent="setCurrent(prevPage)">
        <i class="uk-icon-angle-double-left"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-double-left"></i>
      </span>
    </li>
    <li v-for="page in prePages"
      :class="{'uk-active': page == current}">
      <!-- content -->
      <span v-if="page == current">
        {{ page }}
      </span>
      <a v-else href="" @click.prevent="setCurrent(page)">
        {{ page }}
      </a>
    </li>
    <li v-if="edges < interval.start && (interval.start - edges != 1)">
      <span>...</span>
    </li>
    <li
      v-for="page in pages"
      :class="{'uk-active': page == current}">
      <!-- content -->
      <span v-if="page == current">
        {{ page }}
      </span>
      <a v-else href="" @click.prevent="setCurrent(page)">
        {{ page }}
      </a>
    </li>
    <li v-if="totalPages - edges > interval.end
      && (totalPages - edges - interval.end != 1)">
      <span>...</span>
    </li>
    <li
      v-for="page in postPages"
      :class="{'uk-active': page == current}">
      <!-- content -->
      <span v-if="page == current">
        {{ page }}
      </span>
      <a v-else href="" @click.prevent="setCurrent(page)">
        {{ page }}
      </a>
    </li>
    <li :class="{'uk-disabled': !nextPage}">
      <a v-if="nextPage" href="" @click.prevent="setCurrent(nextPage)">
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
  props: {
    // current page
    current: {
      type: Number,
      default: 1
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
    // max number of edge pages
    edges: {
      type: Number,
      default: 3
    },
    // max numer of displayed pages
    visiblePages: {
      type: Number,
      default: 3
    },
    // page change fallback
    onChange: {
      type: Function
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
  methods: {
    setCurrent: function (page) {
      this.$set('current', page)
      // execute callback
      if (this.onChange) {
        this.onChange()
      }
    }
  }
}
</script>
