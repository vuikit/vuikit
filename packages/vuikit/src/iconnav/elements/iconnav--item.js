import { mergeData } from 'vuikit/src/_core/utils/vue'
import { elements as IconElements } from 'vuikit/src/icon'

const { ElIconLink } = IconElements

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
  render (h, { props, data, children }) {
    const { active, href, target } = props

    return h('li', mergeData(data, {
      class: { 'uk-active': active }
    }), [
      h(ElIconLink, {
        attrs: { href, target }
      }, children)
    ])
  }
}
