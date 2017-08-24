import { IconCloseIcon } from '@vuikit/icons'

export default {
  name: 'VkOffcanvasClose',
  functional: true,
  render (h, { data }) {
    return h('button', {
      staticClass: 'uk-offcanvas-close uk-close uk-icon',
      attrs: {
        type: 'button'
      },
      on: data.on
    }, [
      h(IconCloseIcon)
    ])
  }
}
