import { assign } from 'vuikit/src/_core/utils/object'

import { VkDropdownNav } from 'vuikit/src/dropdown'
import { VkSubnavElItemDropdown } from '../elements'

export default {
  functional: true,
  props: assign({}, VkSubnavElItemDropdown.props, VkDropdownNav.props, {
    mode: {
      type: String,
      default: 'click'
    }
  }),
  render (h, { props, children }) {
    return h(VkSubnavElItemDropdown, { props }, [
      h(VkDropdownNav, { props }, children)
    ])
  }
}
