import { isInteger } from 'helpers/util'

export default {
  functional: true,
  render (h, { parent }) {
    // if not rendered by VkPagination, return comment to mark the position
    if (!(parent.$options && parent.$options._componentTag === 'vk-pagination')) {
      return h('li', 'pages')
    }

    const { active } = parent
    return parent.pages.map(page => {
      const isPage = isInteger(page)
      const isActive = isPage && active === page
      return h('li', { class: { 'uk-active': isActive } }, [
        isPage
          ? isActive
            ? h('span', page)
            : h('a', {
              on: { click: e => {
                parent.$emit('change', page)
              }}
            }, page)
          : h('span', '...')
      ])
    })
  }
}
