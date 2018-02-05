import VkIcon from './icon'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: VkIcon.props,
  render: (h, { data, props, children }) =>

    h('a', mergeData(data, { class: 'uk-icon uk-icon-button' }), [
      props.name
        ? h(`icon-${props.name}`, { props })
        : children
    ])

}
