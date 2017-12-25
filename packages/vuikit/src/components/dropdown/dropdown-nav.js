import Dropdown from './dropdown'
import mergeData from '@vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  props: Dropdown.props,
  render: (h, { data, props, children }) =>

    h(Dropdown, mergeData(data, { props }), [
      h('ul', { class: 'uk-nav uk-dropdown-nav' }, children)
    ])

}
