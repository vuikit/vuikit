import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'left',
      validator: val => !val || /^(left|right|center|justify)$/.test(val)
    },
    flipped: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { children, props, data }) => {
    const { align, flipped } = props

    return h('ul', mergeData(data, {
      class: ['uk-tab', {
        'uk-tab-bottom': flipped,
        'uk-child-width-expand': align === 'justify',
        [`uk-flex-${align}`]: /^(right|center)$/.test(align)
      }]
    }), children)
  }
}
