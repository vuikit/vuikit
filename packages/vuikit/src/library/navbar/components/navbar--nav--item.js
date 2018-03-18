import { assign } from 'vuikit/src/util/lang'
import { mergeData } from 'vuikit/src/util/vue'

import { ElementNavbarNavItem } from '../elements'

export default {
  name: 'VkNavbarNavItem',
  functional: true,
  props: assign({}, ElementNavbarNavItem.props, {
    icon: {
      type: String
    }
  }),
  render (h, { data, props }) {
    props.icon = props.icon && h(`vk-icons-${props.icon}`)

    return h(ElementNavbarNavItem, mergeData(data, { props }))
  }
}
