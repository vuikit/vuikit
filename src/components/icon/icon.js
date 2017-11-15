import mergeData from '~helpers/fn-data-merge'

export default {
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    ratio: {
      type: [String, Number]
    }
  },
  render: (h, { data, props, children }) =>

    h('span', mergeData(data, { class: ['uk-icon'] }), [
      props.icon
        ? h(`icon-${props.icon}`, { props: { ratio: props.ratio } })
        : children
    ])

}
