import { mergeData } from '@vuikit/core/utils/vue'

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
    },
    linked: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props, children }) {
    const { width, linked, align, alignVertical } = props

    return h('td', mergeData(data, {
      class: {
        'uk-table-link': linked,
        'uk-table-shrink': width === 'shrinked',
        'uk-table-expand': width === 'expanded',
        'uk-table-middle': alignVertical === 'middle',
        [`uk-text-${align}`]: /(right|center)/.test(align),
        [`uk-width-${width}`]: /(small|medium|large)/.test(width)
      }
    }), children)
  }
}
