import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { core } from 'vuikit/src/icon'
import { VkNavbarElNavItem } from '../elements'

export default {
  functional: true,
  props: assign({}, core.props, {
    icon: { required: false }
  }, VkNavbarElNavItem.props),
  render (h, { data, props }) {
    return h(VkNavbarElNavItem, mergeData(data, { props }), [
      props.icon && h(core, { props, slot: 'icon' })
    ])
  }
}
