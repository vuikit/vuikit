import VkIcon from './icon'
import mergeData from '~helpers/fn-data-merge'

export default {
  functional: true,
  props: mergeData(VkIcon.props, {
    reset: {
      type: Boolean,
      default: false
    }
  }),
  render: (h, { props, data, children }) =>

    h('a', mergeData(data, {
      class: ['uk-icon', {
        'uk-icon-link': props.reset
      }]
    }), [
      props.icon
        ? h(`icon-${props.icon}`, { props: { ratio: props.ratio } })
        : children
    ])

}
