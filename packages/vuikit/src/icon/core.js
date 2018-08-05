import { assign } from 'vuikit/src/_core/utils/object'
import { isString } from 'vuikit/src/_core/utils/lang'

export default {
  functional: true,
  props: {
    icon: {
      type: [String, Object],
      required: true
    },
    ratio: {
      type: [Number, String],
      default: 1
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    viewBox: {
      type: String
    }
  },
  render (h, { data, props }) {
    const { icon, ...attrs } = props

    // look for a registered icon,
    // fallback to icon object
    const Icon = isString(icon)
      ? h(`vk-icons-${icon}`, { attrs })
      // copy with assign to avoid altering the prop
      : h(assign({}, icon), { attrs })

    return Icon
  }
}
