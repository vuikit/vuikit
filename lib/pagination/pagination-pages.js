import paginationMatrix from 'helpers/pagination-matrix'
import { isInteger } from 'helpers/util'
import { getClosest } from 'helpers/dom'

export default {
  functional: true,
  props: {
    // currently active page
    active: {
      type: Number,
      required: true
    },
    // total amount of items
    total: {
      type: Number,
      required: true
    },
    // items displayed on each page
    limit: {
      type: Number,
      required: true
    },
    // amount of visible pages around the active one
    range: {
      type: Number,
      default: 3
    }
  },
  render (h, { props }) {
    const { active, total, limit, range } = props
    const pages = paginationMatrix({ active, total, limit, range })
    return pages.map(page => {
      const isPage = isInteger(page)
      const isActive = isPage && active === page
      return h('li', { class: { 'uk-active': isActive } }, [
        isPage
          ? isActive
            ? h('span', page)
            : h('a', {
              on: { click: e => {
                const pagination = getClosest(e.target, 'ul.uk-pagination')
                // VkPagination could be the root of the context,
                // in such case the real vm is the first chidlren
                const pagVM = pagination.__vue__.$children.length
                  ? pagination.__vue__.$children[0]
                  : pagination.__vue__
                pagVM.$emit('change', page)
              }}
            }, page)
          : h('span', '...')
      ])
    })
  }
}
