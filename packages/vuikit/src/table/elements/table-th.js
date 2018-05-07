import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'left',
      validator: val => /(left|right|center|middle)/.test(val)
    },
    size: {
      type: String,
      default: '',
      validator: val => !val || /(shrinked|expanded|small|medium|large)/.test(val)
    }
  },
  render (h, { data, props, children }) {
    const { size, align } = props

    return h('th', mergeData(data, {
      class: {
        'uk-table-shrink': size === 'shrinked',
        'uk-table-expand': size === 'expanded',
        [`uk-text-${align}`]: /(right|center)/.test(align),
        [`uk-width-${size}`]: /(small|medium|large)/.test(size)
      }
    }), children)
  }
}
