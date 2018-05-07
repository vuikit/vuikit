import { assign } from '@vuikit/core/utils/lang'
import { mergeData } from '@vuikit/core/utils/vue'

import { ElNavbarNavItem } from '../elements'

export default {
  name: 'VkNavbarNavItem',
  functional: true,
  props: assign({}, ElNavbarNavItem.props, {
    icon: {
      type: String
    }
  }),
  render (h, { data, props }) {
    props.icon = props.icon && h(`vk-icons-${props.icon}`)

    return h(ElNavbarNavItem, mergeData(data, { props }))
  }
}
