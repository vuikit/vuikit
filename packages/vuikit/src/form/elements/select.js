import field from './_field'
import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: field.props,
  render (h, { props, data, children }) {
    const { vkState, vkSize, vkWidth, vkBlank } = props

    return h('select', mergeData(data, {
      class: ['uk-select', {
        'uk-form-blank': vkBlank,
        [`uk-form-${vkState}`]: vkState,
        [`uk-form-${vkSize}`]: vkSize,
        [`uk-form-width-${vkWidth}`]: vkWidth
      }]
    }), children)
  }
}
