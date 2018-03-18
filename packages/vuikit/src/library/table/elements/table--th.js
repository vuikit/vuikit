import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: {
    shrinked: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props, children }) {
    const { shrinked, expanded } = props

    return h('th', mergeData(data, {
      class: {
        'uk-table-shrink': shrinked,
        'uk-table-expand': expanded
      }
    }), children)
  }
}
