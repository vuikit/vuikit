import { mergeData } from '@vuikit/utils/vue'
import { assign } from '@vuikit/utils/lang'

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
    props.icon = props.icon && h(`vk-icons-${props.icon}`)

    return h(ElNavItem, mergeData(data, { props }))
  }
}
