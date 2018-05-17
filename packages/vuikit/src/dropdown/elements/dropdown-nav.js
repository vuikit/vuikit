import ElDropdown from './dropdown'
import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: ElDropdown.props,
  render (h, { data, props, children }) {
    return h(ElDropdown, mergeData({}, data, { props }), [
      h('ul', {
        class: 'uk-nav uk-dropdown-nav'
      }, children)
    ])
  }
}
