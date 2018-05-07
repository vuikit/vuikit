import { assign } from '@vuikit/core/utils/lang'
import { mergeData } from '@vuikit/core/utils/vue'

import { ElIconnavItem } from '../elements'

export default {
  name: 'VkIconnavItem',
  functional: true,
  props: assign({
    icon: {
      type: String,
      required: true
    }
  }, ElIconnavItem.props),
  render (h, { data, props }) {
    return h(ElIconnavItem, mergeData(data, { props }), [
      h(`vk-icons-${props.icon}`)
    ])
  }
}
