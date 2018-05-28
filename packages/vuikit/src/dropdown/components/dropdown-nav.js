import { Drop } from 'vuikit/src/drop'
import { assign } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { ElDropdownNav } from '../elements'

export default {
  functional: true,
  name: 'VkDropdownNav',
  props: Drop.props,
  render (h, { props, data, children }) {
    const items = children.filter(node => node.tag === 'li')

    return h(Drop, mergeData({}, data, {
      props: assign({}, props, {
        mainClass: 'uk-dropdown',
        mainElement: ElDropdownNav
      })
    }), items)
  }
}
