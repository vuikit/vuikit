import { assign } from 'vuikit/src/_core/utils/object'

import { VkDropdown } from 'vuikit/src/dropdown'
import { VkSubnavElItemDropdown } from '../elements'

export default {
  functional: true,
  props: assign({}, VkSubnavElItemDropdown.props, VkDropdown.props, {
    mode: {
      type: String,
      default: 'click'
    }
  }),
  render (h, { props, children }) {
    return h(VkSubnavElItemDropdown, { props }, [
      h(VkDropdown, { props }, children)
    ])
  }
}
