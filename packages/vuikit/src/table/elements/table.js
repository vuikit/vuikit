import { mergeData } from 'vuikit/src/_core/utils/vue'

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
    enlarged: {
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
    middleAligned: {
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
        'uk-table-hover': props.hoverable,
        'uk-table-divider': props.divided,
        'uk-table-striped': props.striped,
        'uk-table-justify': props.justified,
        'uk-table-middle': props.middleAligned,
        'uk-table-responsive': props.responsive,
        'uk-table-small': props.narrowed && !props.enlarged,
        'uk-table-large': props.enlarged && !props.narrowed
      }]
    }), children)
  }
}
