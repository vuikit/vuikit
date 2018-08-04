import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'left',
      validator: val => /(left|center|right)/.test(val)
    },
    alignVertical: {
      type: String,
      default: '',
      validator: val => !val || /(middle)/.test(val)
    },
    width: {
      type: String,
      default: '',
      validator: val => !val || /(shrinked|expanded|small|medium|large)/.test(val)
    }
  },
  render (h, { data, props, children }) {
    const { width, align, alignVertical } = props

    return h('th', mergeData(data, {
      class: {
        'uk-table-shrink': width === 'shrinked',
        'uk-table-expand': width === 'expanded',
        'uk-table-middle': alignVertical === 'middle',
        [`uk-text-${align}`]: /(right|center)/.test(align),
        [`uk-width-${width}`]: /(small|medium|large)/.test(width)
      }
    }), children)
  }
}
