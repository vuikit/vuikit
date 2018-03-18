import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    cellMiddle: {
      type: Boolean,
      default: false
    },
    shrinked: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
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
    const { cellMiddle, shrinked, expanded, width, linked, truncated, unwrapped } = props

    return h('td', mergeData(data, {
      class: {
        'uk-table-link': linked,
        'uk-table-middle': cellMiddle,
        'uk-table-shrink': shrinked,
        'uk-table-expand': expanded,
        'uk-text-nowrap': unwrapped,
        'uk-text-truncate': truncated,
        [`uk-width-${width}`]: width
      }
    }), children)
  }
}
