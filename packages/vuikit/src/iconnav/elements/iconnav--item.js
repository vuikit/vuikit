import { mergeData } from 'vuikit/src/_core/utils/vue'
import { VkIconElLink } from 'vuikit/src/icon'

export default {
  functional: true,
  props: {
    href: String,
    target: String,
    active: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children: icon }) {
    const { active, href, target } = props

    return h('li', mergeData(data, {
      class: { 'uk-active': active }
    }), [
      h(VkIconElLink, {
        attrs: { href, target }
      }, icon)
    ])
  }
}
