import { assign } from 'vuikit/src/_core/utils/lang'

import { Dropdown } from 'vuikit/src/dropdown'
import { ElSubnavItemDropdown } from '../elements'

export default {
  functional: true,
  name: 'VkSubnavItemDropdown',
  props: assign({}, ElSubnavItemDropdown.props, Dropdown.props, {
    mode: {
      type: String,
      default: 'click'
    }
  }),
  render (h, { props, children }) {
    return h(ElSubnavItemDropdown, { props }, [
      h(Dropdown, { props }, children)
    ])
  }
}
