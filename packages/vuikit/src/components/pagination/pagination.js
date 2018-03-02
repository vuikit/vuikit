import Element from './elements/pagination'
import Matrix from 'vuikit/src/util/pagination/matrix'

import { warn } from 'vuikit/src/util/debug'
import { assign } from 'vuikit/src/util/lang'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  name: 'Pagination',
  props: assign({}, Element.props, {
    // the active page
    page: {
      type: Number,
      default: 1
    },
    // items displayed on each page
    perPage: {
      type: Number,
      required: true
    },
    // total amount of items
    total: {
      type: Number,
      required: true
    },
    // amount of visible pages around the active one
    range: {
      type: Number,
      default: 3
    }
  }),
  computed: {
    prevPage () {
      return this.page - 1
    },
    nextPage () {
      return this.page + 1
    },
    pages () {
      return Matrix({ total: this.total, page: this.page, perPage: this.perPage })
    },
    lastPage () {
      return this.pages[this.pages.length - 1]
    }
  },
  methods: {
    update (page) {
      this.$emit('update:page', page)
    }
  },
  render (h) {
    return h(Element, {
      props: this.$props
    }, this.$slots.default.filter(node => node.tag).map(node => {

      if (process.env.NODE_ENV !== 'production' && !node.fnOptions) {
        warn('vk-pagination -> pagination components must be functional', this)
      }

      // rerender Pagination become it parent
      return node.data.rerender
        ? h(node.fnOptions, mergeData(node.data, {
          rerendering: true
        }))
        : node
    }))
  }
}
