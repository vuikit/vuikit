import { ElementPagination } from '../elements'
import Matrix from 'vuikit/src/util/pagination-matrix'
import VkMargin from 'vuikit/src/library/margin'

import { warn } from 'vuikit/src/util/debug'
import { assign } from 'vuikit/src/util/lang'
import { mergeData } from 'vuikit/src/util/vue'

export default {
  name: 'Pagination',
  directives: { VkMargin },
  props: assign({}, ElementPagination.props, {
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
    const nodes = (this.$slots.default || []).filter(node => node.tag)

    return h(ElementPagination, {
      props: this.$props,
      directives: [{
        name: 'vk-margin'
      }]
    }, nodes.map(node => {
      if (!node.fnOptions) {
        process.env.NODE_ENV !== 'production' &&
          warn(`vk-pagination -> ${node.tag} component is not functional`, this)

        return
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
