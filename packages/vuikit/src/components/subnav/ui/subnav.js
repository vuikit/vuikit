import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    divided: {
      type: Boolean,
      default: false
    },
    pilled: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { props, data, children }) => {
    const { divided, pilled } = props

    return h('ul', mergeData(data, {
      class: ['uk-subnav', {
        'uk-subnav-divider': divided,
        'uk-subnav-pill': pilled
      }]
    }), children)
  }
}
