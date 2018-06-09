import { isString } from 'vuikit/src/_core/utils/lang'

export default {
  functional: true,
  props: {
    icon: {
      required: true
    },
    ratio: {
      type: [Number, String],
      default: 1
    }
  },
  render (h, { data, props }) {
    const { icon, ratio } = props
    const attrs = data.attrs || {}

    const Icon = isString(icon)
      ? h(`vk-icons-${icon}`, { attrs })
      : h(icon, { attrs })

    if (ratio !== 1) {
      Icon.data.attrs.width *= ratio
      Icon.data.attrs.height *= ratio
      Icon.data.attrs.ratio = ratio
    }

    return Icon
  }
}
