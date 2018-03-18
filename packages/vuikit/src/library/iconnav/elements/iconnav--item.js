import { mergeData } from 'vuikit/src/util/vue'
import { ElementIconLink } from 'vuikit/src/library/icon'

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
      h(ElementIconLink, {
        attrs: { href, target }
      }, children)
    ])
  }
}
