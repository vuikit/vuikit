<template>
  <ul class="uk-pagination" :class="{
    'uk-flex-center': align !== 'left' && align !== 'right',
    'uk-flex-right': align === 'right'
  }">
    <pag-parts></pag-parts>
  </ul>
</template>

<script>
import PaginationLast from './pagination-last'
import PaginationPrev from './pagination-prev'
import PaginationNext from './pagination-next'
import PaginationFirst from './pagination-first'
import PaginationPages from './pagination-pages'

import { isArray } from 'vuikit/src/util/lang'
import paginationMatrix from 'vuikit/src/util/pagination/matrix'

const partsMap = {
  first: PaginationFirst,
  last: PaginationLast,
  prev: PaginationPrev,
  next: PaginationNext,
  pages: PaginationPages
}

export default {
  name: 'Pagination',
  props: {
    align: {
      type: String,
      default: 'center' // left|center|right
    },
    // the active page
    page: {
      type: Number
    },
    // items displayed on each page
    perPage: {
      type: Number
    },
    // amount of visible pages around the active one
    range: {
      type: Number,
      default: 3
    },
    // total amount of items
    total: {
      type: Number
    }
  },
  computed: {
    prevPage () {
      return this.page - 1
    },
    nextPage () {
      return this.page + 1
    },
    pages () {
      return paginationMatrix({ total: this.total, page: this.page, perPage: this.perPage })
    },
    lastPage () {
      return this.pages[this.pages.length - 1]
    }
  },
  components: {
    'pag-parts': {
      functional: true,
      render (h, { parent }) {
        let lis = []
        parent.$parts.forEach(part => {
          part = parent.$createElement(part.comp, { props: part.props })

          if (isArray(part)) {
            lis = lis.concat(part)
          } else {
            lis.push(part)
          }
        })

        return lis
      }
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
