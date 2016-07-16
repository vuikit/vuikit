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
        @click.prevent="$emit('change', 1)">
        <i class="uk-icon-angle-double-left"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-double-left"></i>
      </span>
      <!-- prevPage -->
      <a href="" v-if="prevPage"
        @click.prevent="$emit('change', prevPage)">
        <i class="uk-icon-angle-left"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-left"></i>
      </span>
    </li>
    <li v-for="page in prePages"
      :class="{
        'uk-active': page === selected
      }">
      <span v-if="page === selected" v-text="page"></span>
      <a v-else
        href=""
        v-text="page"
        @click.prevent="$emit('change', page)">
      </a>
    </li>
    <li v-if="range.start > (prePages.length + 1)">
      <span>...</span>
    </li>
    <li v-for="page in pages"
      :class="{
        'uk-active': page === selected
      }">
      <span v-if="page === selected" v-text="page"></span>
      <a v-else
        href=""
        @click.prevent="$emit('change', page)"
        v-text="page">
      </a>
    </li>
    <li v-if="(range.end + 1) < postPages[0]">
      <span>...</span>
    </li>
    <li v-for="page in postPages"
      :class="{
        'uk-active': page === selected
      }">
      <span v-if="page === selected">
        {{ page }}
      </span>
      <a v-else
        href=""
        v-text="page"
        @click.prevent="$emit('change', page)">
      </a>
    </li>
    <li :class="{
      'uk-disabled': !nextPage,
      'uk-pagination-next': !compact
    }">
      <!-- nextPage -->
      <a href="" v-if="nextPage"
        @click.prevent="$emit('change', nextPage)">
        <i class="uk-icon-angle-right"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-right"></i>
      </span>
      <!-- last page -->
      <a href="" v-if="nextPage"
        @click.prevent="$emit('change', totalPages)">
        <i class="uk-icon-angle-double-right"></i>
      </a>
      <span v-else>
        <i class="uk-icon-angle-double-right"></i>
      </span>
    </li>
  </ul>
</template>

<script>
import { range } from 'lodash'

export default {
  name: 'VkPagination',
  props: {
    // total cross page number of items
    items: {
      type: Number,
      required: true
    },
    // the selected page
    selected: {
      type: Number,
      default: 1
    },
    // amount of pages around selected page
    pageRange: {
      type: Number,
      default: 2
    },
    // items for each page
    perPage: {
      type: Number,
      default: 5
    },
    // left or right, defaults to center
    align: {
      type: String,
      default: ''
    },
    // next/prev btns position
    compact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    prevPage () {
      return (this.selected - 1) !== 0
        ? this.selected - 1
        : null
    },
    nextPage () {
      return (this.selected + 1) <= this.totalPages
        ? this.selected + 1
        : null
    },
    totalPages () {
      return Math.ceil(this.items / this.perPage)
    },
    range () {
      let start = this.selected - this.pageRange
      let end = this.selected + this.pageRange
      if (end > this.totalPages) {
        end = this.totalPages
        start = this.totalPages - this.pageRange * 2
        start = start < 1 ? 1 : start
      }
      if (start <= 1) {
        start = 1
        end = Math.min(this.pageRange * 2 + 1, this.totalPages)
      }
      return { start, end }
    },
    prePages () {
      const pages = []
      if (this.range.start <= 3) {
        for (let i = 1; i < this.range.start; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
      }
      return pages
    },
    pages () {
      return range(this.range.start, this.range.end + 1)
    },
    postPages () {
      const pages = []
      if (this.range.end >= this.totalPages - 2) {
        for (let i = this.range.end + 1; i <= this.totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(this.totalPages)
      }
      return pages
    }
  }
}
</script>
