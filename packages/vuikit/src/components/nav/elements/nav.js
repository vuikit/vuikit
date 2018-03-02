import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: {
    center: {
      type: Boolean,
      default: false
    },
    type: {
      type: [Boolean, String],
      default: 'default',
      validator: val => !val || /^(default|primary)$/.test(val)
    }
  },
  render (h, { props, data, children }) {
    const { center, type } = props

    return h('ul', mergeData(data, {
      class: ['uk-nav', {
        'uk-nav-center': center,
        [`uk-nav-${type}`]: type
      }]
    }), children)
  }
}
