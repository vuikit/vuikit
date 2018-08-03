import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    type: {
      type: String,
      validator: val => !val || /^(default|primary|secondary|muted)$/.test(val)
    },
    size: {
      type: String,
      validator: val => !val || /^(xsmall|small|large|xlarge)$/.test(val)
    }
  },
  render (h, { props, data, children }) {
    const { type, size } = props

    return h('div', mergeData(data, {
      class: ['uk-section', {
        [`uk-section-${type}`]: type,
        [`uk-section-${size}`]: size
      }]
    }), children)
  }
}
