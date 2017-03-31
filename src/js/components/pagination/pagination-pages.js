import { isInteger } from 'src/js/util/index'

export default {
  functional: true,
  render (h, { parent }) {
    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', 'pages')
    }

    const { page } = parent
    return parent.pages.map(p => {
      const isPage = isInteger(p)
      const isActive = isPage && page === p
      return h('li', { class: { 'uk-active': isActive } }, [
        isPage
          ? isActive
            ? h('span', p)
            : h('a', {
              on: { click: e => {
                parent.$emit('change', p)
              }}
            }, p)
          : h('span', '...')
      ])
    })
  }
}
