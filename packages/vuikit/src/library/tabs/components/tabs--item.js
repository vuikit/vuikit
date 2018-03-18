import { assign } from 'vuikit/src/util/lang'
import { mergeData } from 'vuikit/src/util/vue'

import { TAB_ID } from '../constants'
import { ElementTabsItem } from '../elements'

export default {
  name: 'VkTabsItem',
  props: assign({}, ElementTabsItem.props, {
    icon: {
      type: String
    }
  }),
  render (h) {
    return h('div', this.$slots.default)
  },
  tabRender (h, { data, props, children, parent }) {
    props.icon = props.icon && h(`vk-icons-${props.icon}`)

    return h(ElementTabsItem, mergeData(data, {
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
