import mergeData from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  props: {
    icon: {
      type: String,
      required: true
    },
    ratio: {
      type: [String, Number]
    }
  },
  render: (h, { data, props }) =>

    h('span', mergeData(data, { class: ['uk-icon'] }), [
      h(`icon-${props.icon}`, { props: { ratio: props.ratio } })
    ])

}
