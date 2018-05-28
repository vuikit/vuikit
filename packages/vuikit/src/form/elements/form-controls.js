import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    text: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children }) {
    const { text } = props

    return h('div', mergeData(data, {
      class: ['uk-form-controls', {
        'uk-form-controls-text': text
      }]
    }), children)
  }
}
