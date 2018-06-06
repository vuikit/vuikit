import { ElFormIcon } from '../elements'

import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  name: 'VkFormIcon',
  props: assign({}, ElFormIcon.props, {
    icon: String
  }),
  render (h, { props, data, attrs }) {
    const Icon = h(`vk-icons-${props.icon}`, { attrs })

    return h(ElFormIcon, mergeData(data, { props }), [
      Icon
    ])
  }
}
