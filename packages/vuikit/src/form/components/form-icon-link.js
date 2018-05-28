import { ElFormIconLink } from '../elements'

import { assign } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  name: 'VkFormIconLink',
  props: assign({}, ElFormIconLink.props, {
    icon: String
  }),
  render (h, { props, data, attrs }) {
    const Icon = h(`vk-icons-${props.icon}`, { attrs })

    return h(ElFormIconLink, mergeData(data, { props }), [
      Icon
    ])
  }
}
