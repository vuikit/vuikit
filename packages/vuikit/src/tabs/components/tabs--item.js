import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { core } from 'vuikit/src/icon'
import { TAB_ID } from '../constants'
import { ElTabsItem } from '../elements'

export default {
  name: 'VkTabsItem',
  props: assign({}, core.props, {
    icon: { required: false }
  }, ElTabsItem.props),
  render (h) {
    return h('div', this.$slots.default)
  },
  tabRender (h, { data, props, children = [], parent }) {
    return h(ElTabsItem, mergeData(data, {
      props,
      on: {
        click: e => {
          e.preventDefault()
          parent.setActiveTab(data[TAB_ID])
        }
      }
    }), [
      props.icon && h(core, { props, slot: 'icon' }),
      ...children
    ])
  }
}
