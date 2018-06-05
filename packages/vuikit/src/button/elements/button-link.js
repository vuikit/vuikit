import { mergeData } from 'vuikit/src/_core/utils/vue'

import ElButton from './button'

const { htmlType, ...props } = ElButton.props

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    const { active, type, size } = props

    return h('a', mergeData(data, {
      class: ['uk-button', `uk-button-${type}`, {
        'uk-active': active,
        [`uk-button-${size}`]: size
      }]
    }), children)
  }
}
