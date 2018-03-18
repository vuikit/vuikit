import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    center: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default',
      validator: val => /^(default|primary|blank)$/.test(val)
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
