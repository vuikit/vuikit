import { mergeData } from 'vuikit/src/_core/utils/vue'
import { isUndefined } from 'vuikit/src/_core/utils/lang'

export default {
  functional: true,
  props: {
    href: String,
    target: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { props, data, children }) => {
    const { disabled, href, target } = props

    return h('li', mergeData(data, {
      class: {
        'uk-disabled': disabled
      }
    }), [
      (isUndefined(href) || disabled)
        ? h('span', children)
        : h('a', { attrs: { href, target } }, children)
    ])
  }
}
