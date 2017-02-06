<template>
  <ul class="uk-pagination" :class="{
    'uk-flex-center': align !== 'left' && align !== 'right',
    'uk-flex-right': align === 'right'
  }">
    <pag-parts></pag-parts>
  </ul>
</template>

<script>
import { isArray } from 'helpers/util'
import paginationMatrix from 'helpers/pagination-matrix'
import PaginationFirst from './pagination-first'
import PaginationLast from './pagination-last'
import PaginationPrev from './pagination-prev'
import PaginationNext from './pagination-next'
import PaginationPages from './pagination-pages'

const partsMap = {
  first: PaginationFirst,
  last: PaginationLast,
  prev: PaginationPrev,
  next: PaginationNext,
  pages: PaginationPages
}

export default {
  name: 'VkPagination',
  components: {
    'pag-parts': {
      functional: true,
      render (h, { parent }) {
        let lis = []
        parent.$parts.forEach(part => {
          part = parent.$createElement(part.comp, { props: part.props })
          lis = isArray(part)
            ? [...lis, ...part]
            : [...lis, part]
        })
        return lis
      }
    }
  },
  props: {
    // currently active page
    active: {
      type: Number
    },
    // total amount of items
    total: {
      type: Number
    },
    // items displayed on each page
    limit: {
      type: Number
    },
    // amount of visible pages around the active one
    range: {
      type: Number,
      default: 3
    },
    align: {
      type: String,
      default: 'center' // left|center|right
    }
  },
  computed: {
    prevPage () {
      return this.active - 1
    },
    nextPage () {
      return this.active + 1
    },
    pages () {
      return paginationMatrix({ active: this.active, total: this.total, limit: this.limit })
    },
    lastPage () {
      return this.pages[this.pages.length - 1]
    }
  },
  created () {
    this.$parts = this.$slots.default
      .filter(slot => slot.children)
      .map(slot => ({
        comp: partsMap[slot.children[0].text],
        props: (slot.data && slot.data.attrs) || {}
      }))
  }
}
</script>
