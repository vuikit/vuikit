import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    divided: {
      type: Boolean,
      default: true
    },
    narrowed: {
      type: Boolean,
      default: false
    },
    cellMiddle: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props, children }) {
    return h('table', mergeData(data, {
      class: ['uk-table', {
        'uk-table-small': props.narrowed,
        'uk-table-hover': props.hoverable,
        'uk-table-middle': props.cellMiddle,
        'uk-table-divider': props.divided,
        'uk-table-striped': props.striped,
        'uk-table-justify': props.justified,
        'uk-table-responsive': props.responsive
      }]
    }), children)
  }
}
