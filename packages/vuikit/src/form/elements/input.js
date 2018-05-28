import field from './_field'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: field.props,
  render (h, { props, data }) {
    const { vkState, vkSize, vkWidth, vkBlank } = props

    return h('input', mergeData(data, {
      class: ['uk-input', {
        'uk-form-blank': vkBlank,
        [`uk-form-${vkState}`]: vkState,
        [`uk-form-${vkSize}`]: vkSize,
        [`uk-form-width-${vkWidth}`]: vkWidth
      }]
    }))
  }
}
