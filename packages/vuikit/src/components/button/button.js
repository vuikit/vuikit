import mergeData from 'vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default',
      validator: val => val.match(/^(default|primary|secondary|danger|text|link)$/)
    },
    size: {
      type: String,
      validator: val => !val || val.match(/^(small|large)$/)
    },
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  render (h, { data, props, children }) {
    const { disabled, type, size, active, htmlType } = props

    const def = {
      attrs: {
        type: htmlType,
        disabled
      },
      class: ['uk-button', `uk-button-${type}`, {
        'uk-active': active,
        [`uk-button-${size}`]: size
      }]
    }

    return h('button', mergeData(data, def), children)
  }
}
