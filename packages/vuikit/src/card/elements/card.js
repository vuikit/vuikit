import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'default',
      validator: val => /^(default|primary|secondary|blank)$/.test(val)
    },
    padding: {
      type: String,
      validator: val => !val || /^(small|large)$/.test(val)
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children }) {
    const { type, padding, hover } = props

    return h('div', mergeData(data, {
      class: ['uk-card', {
        'uk-card-hover': hover,
        [`uk-card-${type}`]: type,
        [`uk-card-${padding}`]: padding
      }]
    }), children)
  }
}
