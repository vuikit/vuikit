import { assign } from 'vuikit/src/util/lang'
import { mergeData } from 'vuikit/src/util/vue'

import { ElementIconnavItem } from '../elements'

export default {
  name: 'VkIconnavItem',
  functional: true,
  props: assign({
    icon: {
      type: String,
      required: true
    }
  }, ElementIconnavItem.props),
  render (h, { data, props }) {
    return h(ElementIconnavItem, mergeData(data, { props }), [
      h(`vk-icons-${props.icon}`)
    ])
  }
}
