import { mergeData } from 'vuikit/src/_core/utils/vue'

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
        'uk-child-width-expand': align === 'justify',
        'uk-tab-bottom uk-margin-bottom-remove uk-margin-top': flipped,
        [`uk-flex-${align}`]: /^(right|center)$/.test(align)
      }]
    }), children)
  }
}
