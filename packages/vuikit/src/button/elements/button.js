import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: val => !val || /^(small|large)$/.test(val)
    },
    type: {
      type: String,
      default: 'default',
      validator: val => !val || /^(default|primary|secondary|danger|text|link)$/.test(val)
    },
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  render (h, { props, data, children }) {
    const { htmlType, active, type, size } = props

    return h('button', mergeData(data, {
      attrs: { type: htmlType },
      class: ['uk-button', `uk-button-${type}`, {
        'uk-active': active,
        [`uk-button-${size}`]: size
      }]
    }), children)
  }
}
