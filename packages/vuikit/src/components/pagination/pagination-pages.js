import { isInteger } from 'vuikit/src/util/lang'
import ElementPage from './elements/pagination-page'

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
      const isPage = isInteger(page)

      return isPage
        ? h(ElementPage, {
          props: {
            label: page,
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
