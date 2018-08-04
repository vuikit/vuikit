import { mergeData } from 'vuikit/src/_core/utils/vue'

import { VkDrop } from 'vuikit/src/drop'
import { VkDropdownElNav } from '../elements'

export default {
  functional: true,
  props: VkDrop.props,
  render (h, { props, data, children }) {
    const items = children.filter(node => node.tag === 'li')

    return h(VkDrop, mergeData({}, data, { props }, {
      props: {
        mainClass: 'uk-dropdown',
        mainElement: VkDropdownElNav
      }
    }), items)
  }
}
