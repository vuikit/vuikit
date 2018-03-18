import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    divided: {
      type: Boolean,
      default: false
    },
    matched: {
      type: Boolean,
      default: false
    },
    gutter: {
      type: String,
      validator: val => !val || /^(small|medium|large|collapse)$/.test(val)
    }
  },
  render (h, { props, data, children }) {
    const { tag, gutter, divided, matched } = props

    return h(tag, mergeData(data, {
      class: ['uk-grid', {
        'uk-grid-match': matched,
        'uk-grid-divider': divided,
        [`uk-grid-${gutter}`]: gutter
      }]
    }), children)
  }
}
