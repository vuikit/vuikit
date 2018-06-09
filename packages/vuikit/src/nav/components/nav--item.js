import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { core } from 'vuikit/src/icon'
import { ElNavItem } from '../elements'

export default {
  name: 'VkNavItem',
  functional: true,
  props: assign({}, core.props, {
    icon: { required: false }
  }, ElNavItem.props),
  render (h, { data, props }) {
    return h(ElNavItem, mergeData(data, { props }), [
      props.icon && h(core, { props, slot: 'icon' })
    ])
  }
}
