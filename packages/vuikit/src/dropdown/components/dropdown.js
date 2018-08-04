import { mergeData } from 'vuikit/src/_core/utils/vue'

import { VkDrop } from 'vuikit/src/drop'
import { VkDropdownEl } from '../elements'

export default {
  functional: true,
  props: VkDrop.props,
  render (h, { props, data, children }) {
    return h(VkDrop, mergeData({}, data, { props }, {
      props: {
        mainClass: 'uk-dropdown',
        mainElement: VkDropdownEl
      }
    }), children)
  }
}
