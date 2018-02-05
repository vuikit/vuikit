import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    name: {
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
      props.name
        ? h(`icon-${props.name}`, { props })
        : children
    ])

}
