import VkDropdownEl from './dropdown'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: VkDropdownEl.props,
  render (h, { data, props, children }) {
    return h(VkDropdownEl, mergeData({}, data, { props }), [
      h('ul', {
        class: 'uk-nav uk-dropdown-nav'
      }, children)
    ])
  }
}
