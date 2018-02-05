import core from './core'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default mergeData({}, core, {
  render (h, { props, data, children }) {
    const { type, size, active } = props

    return h('a', mergeData(data, {
      class: ['uk-button', `uk-button-${type || 'default'}`, {
        'uk-active': active,
        [`uk-button-${size}`]: size
      }]
    }), children)
  }
})
