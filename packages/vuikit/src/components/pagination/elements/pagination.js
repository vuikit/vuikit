import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'center',
      validator: val => /^(left|center|right)$/.test(val)
    }
  },
  render (h, { props, data, children }) {
    const { align } = props

    return h('ul', mergeData(data, {
      class: ['uk-pagination', {
        [`uk-flex-${align}`]: align !== 'left'
      }]
    }), children)
  }
}
