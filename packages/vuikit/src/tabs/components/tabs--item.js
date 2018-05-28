import { assign } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { TAB_ID } from '../constants'
import { ElTabsItem } from '../elements'

export default {
  name: 'VkTabsItem',
  props: assign({}, ElTabsItem.props, {
    icon: {
      type: String
    }
  }),
  render (h) {
    return h('div', this.$slots.default)
  },
  tabRender (h, { data, props, children, parent }) {
    props.icon = props.icon && h(`vk-icons-${props.icon}`)

    return h(ElTabsItem, mergeData(data, {
      props,
      on: {
        click: e => {
          e.preventDefault()
          parent.setActiveTab(data[TAB_ID])
        }
      }
    }), children)
  }
}
