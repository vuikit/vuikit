import { mergeData } from 'vuikit/src/util/vue'
import { assign } from 'vuikit/src/util/lang'

import { ElementNavItem } from '../elements'

export default {
  name: 'VkNavItem',
  functional: true,
  props: assign({}, ElementNavItem.props, {
    icon: {
      type: String
    }
  }),
  render (h, { data, props }) {
    props.icon = props.icon && h(`vk-icons-${props.icon}`)

    return h(ElementNavItem, mergeData(data, { props }))
  }
}
