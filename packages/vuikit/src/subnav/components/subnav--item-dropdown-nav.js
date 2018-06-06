import { assign } from 'vuikit/src/_core/utils/object'

import { DropdownNav } from 'vuikit/src/dropdown'
import { ElSubnavItemDropdown } from '../elements'

export default {
  functional: true,
  name: 'VkSubnavItemDropdown',
  props: assign({}, ElSubnavItemDropdown.props, DropdownNav.props, {
    mode: {
      type: String,
      default: 'click'
    }
  }),
  render (h, { props, children }) {
    return h(ElSubnavItemDropdown, { props }, [
      h(DropdownNav, { props }, children)
    ])
  }
}
