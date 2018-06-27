import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    bullet: {
      type: Boolean,
      default: false
    },
    divided: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    spaced: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props, children }) {
    const { bullet, divided, striped, spaced } = props

    return h('ul', mergeData(data, {
      class: ['uk-list', {
        'uk-list-large': spaced,
        'uk-list-bullet': bullet,
        'uk-list-divider': divided,
        'uk-list-striped': striped
      }]
    }), children)
  }
}
