import { assign } from 'vuikit/src/_core/utils/object'
import { VkTabsElTab } from '../elements'

export default {
  props: assign({}, VkTabsElTab.props, {
    icon: {}
  }),
  render (h) {
    return h('div', this.$slots.default)
  }
}
