import VkIcon from './icon'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: mergeData(VkIcon.props, {
    reset: {
      type: Boolean,
      default: false
    }
  }),
  render: (h, { data, props, children }) =>

    h('a', mergeData(data, {
      class: ['uk-icon', {
        'uk-icon-link': props.reset
      }]
    }), [
      props.name
        ? h(`icon-${props.name}`, { props })
        : children
    ])

}
