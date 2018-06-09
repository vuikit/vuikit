import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { core } from 'vuikit/src/icon'
import { ElNavbarNavItem } from '../elements'

export default {
  name: 'VkNavbarNavItem',
  functional: true,
  props: assign({}, core.props, {
    icon: { required: false }
  }, ElNavbarNavItem.props),
  render (h, { data, props }) {
    return h(ElNavbarNavItem, mergeData(data, { props }), [
      props.icon && h(core, { props, slot: 'icon' })
    ])
  }
}
