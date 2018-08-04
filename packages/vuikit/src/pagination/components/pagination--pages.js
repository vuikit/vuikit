import { isNumber } from 'vuikit/src/_core/utils/lang'
import { VkPaginationElPage } from '../elements'

export default {
  functional: true,
  render: (h, { data, props, parent }) => {
    // related to vk-pagination node rerendering,
    // abort until the context is the right one
    if (!data.rerendering) {
      return h('li', {
        rerender: true
      })
    }

    const { page: currentPage } = parent

    return parent.pages.map(page => {
      const isPage = isNumber(page)

      return isPage
        ? h(VkPaginationElPage, {
          props: {
            title: page,
            active: currentPage === page
          },
          on: {
            click: e => parent.$emit('update:page', page)
          }
        })
        : h('li', [ h('span', '...') ])
    })
  }
}
