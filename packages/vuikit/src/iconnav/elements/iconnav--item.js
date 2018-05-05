import { mergeData } from '@vuikit/utils/vue'
import { ElIconLink } from 'vuikit/src/icon'

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
