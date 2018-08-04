import { mergeData } from 'vuikit/src/_core/utils/vue'
import { VkIconEl } from 'vuikit/src/icon'

export default {
  functional: true,
  props: {
    href: String,
    target: String,
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children, slots }) {
    const _slots = slots()
    const { active, title, subtitle, icon, href, target } = props

    const Subtitle = subtitle && h('div', [ title, h('div', {
      class: 'uk-navbar-subtitle'
    }, subtitle) ])

    return h('li', mergeData(data, {
      class: { 'uk-active': active }
    }), [
      h('a', {
        attrs: { href, target }
      }, [
        _slots.icon && h(VkIconEl, {
          class: 'uk-margin-small-right'
        }, [ icon ]),
        Subtitle || title
      ]),
      children
    ])
  }
}
