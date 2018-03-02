import Element from './elements/tabs-item'
import mergeData from 'vuikit/src/util/vue-data-merge'

import { TAB_ID } from './constants'

export default {
  name: 'VkTabsItem',
  props: Element.props,
  render (h) {
    return h('div', this.$slots.default)
  },
  tabRender (h, { data, props, children, parent }) {
    return h(Element, mergeData(data, {
      props: {
        icon: props.icon && h(`icon-${props.icon}`)
      },
      on: {
        click: e => {
          e.preventDefault()
          parent.setActiveTab(data[TAB_ID])
        }
      }
    }), children)
  }
}
