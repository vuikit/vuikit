import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { ElNavItem } from '../elements'

export default {
  name: 'VkNavItem',
  functional: true,
  props: assign({}, ElNavItem.props, {
    icon: {
      type: String
    }
  }),
  render (h, { data, props }) {
    return h(ElNavItem, mergeData(data, { props }), [
      props.icon && h(`vk-icons-${props.icon}`, { slot: 'icon' })
    ])
  }
}
