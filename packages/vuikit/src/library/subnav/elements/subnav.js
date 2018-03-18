import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    divided: {
      type: Boolean,
      default: false
    },
    pill: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, children }) {
    const { divided, pill } = props

    return h('ul', mergeData(data, {
      class: ['uk-subnav', {
        'uk-subnav-divider': divided,
        'uk-subnav-pill': pill
      }]
    }), children)
  }
}
