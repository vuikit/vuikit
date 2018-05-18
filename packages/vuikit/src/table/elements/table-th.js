import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'left',
      validator: val => /(left|center|right)/.test(val)
    },
    width: {
      type: String,
      default: '',
      validator: val => !val || /(shrinked|expanded|small|medium|large)/.test(val)
    }
  },
  render (h, { data, props, children }) {
    const { width, align } = props

    return h('th', mergeData(data, {
      class: ['uk-text-nowrap', {
        'uk-table-shrink': width === 'shrinked',
        'uk-table-expand': width === 'expanded',
        [`uk-text-${align}`]: /(right|center)/.test(align),
        [`uk-width-${width}`]: /(small|medium|large)/.test(width)
      }]
    }), children)
  }
}
