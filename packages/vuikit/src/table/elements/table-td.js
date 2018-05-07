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
    },
    width: {
      type: String,
      default: ''
    },
    linked: {
      type: Boolean,
      default: false
    },
    truncated: {
      type: Boolean,
      default: false
    },
    unwrapped: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props, children }) {
    const { size, linked, truncated, unwrapped, align } = props

    return h('td', mergeData(data, {
      class: {
        'uk-table-link': linked,
        'uk-table-middle': align === 'middle',
        'uk-table-shrink': size === 'shrinked',
        'uk-table-expand': size === 'expanded',
        'uk-text-nowrap': unwrapped,
        'uk-text-truncate': truncated,
        [`uk-text-${align}`]: /(right|center)/.test(align),
        [`uk-width-${size}`]: /(small|medium|large)/.test(size)
      }
    }), children)
  }
}
