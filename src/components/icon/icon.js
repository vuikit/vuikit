import mergeData from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    viewBox: String,
    ratio: [String, Number],
    width: [String, Number],
    height: [String, Number]
  },
  render: (h, { data, props, children }) =>

    h('span', mergeData(data, { class: ['uk-icon'] }), [
      props.icon
        ? h(`icon-${props.icon}`, { props })
        : children
    ])

}
