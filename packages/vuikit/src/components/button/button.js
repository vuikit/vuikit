import core from './core'
import mergeData from 'vuikit/core/util/vue-data-merge'

export default mergeData({}, core, {
  props: {
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  render (h, { props, data, children }) {
    const { type, size, active, htmlType } = props

    return h('button', mergeData(data, {
      attrs: {
        type: htmlType
      },
      class: ['uk-button', `uk-button-${type}`, {
        'uk-active': active,
        [`uk-button-${size}`]: size
      }]
    }), children)
  }
})
