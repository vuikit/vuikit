import Element from './elements/tabs-item'
import { mergeData } from 'vuikit/src/util/vue'
import { assign } from 'vuikit/src/util/lang'

import { TAB_ID } from './constants'

export default {
  name: 'VkTabsItem',
  props: assign({}, Element.props, {
    icon: {
      type: String
    }
  }),
  render (h) {
    return h('div', this.$slots.default)
  },
  tabRender (h, { data, props, children, parent }) {
    props.icon = props.icon && h(`vk-icons-${props.icon}`)

    return h(Element, mergeData(data, {
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
