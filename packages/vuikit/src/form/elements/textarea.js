import field from './_field'

import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: assign({}, field.props, {
    vkWidth: {
      type: String,
      validator: val => !val || /^(large|medium|small)$/.test(val)
    }
  }),
  render (h, { props, data }) {
    const { vkState, vkSize, vkWidth, vkBlank } = props

    return h('textarea', mergeData(data, {
      class: ['uk-textarea', {
        'uk-form-blank': vkBlank,
        [`uk-form-${vkState}`]: vkState,
        [`uk-form-${vkSize}`]: vkSize,
        [`uk-form-width-${vkWidth}`]: vkWidth
      }]
    }))
  }
}
