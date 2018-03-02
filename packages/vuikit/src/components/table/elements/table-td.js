import mergeData from 'vuikit/src/util/vue-data-merge'

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

    return h('td', mergeData(data, {
      class: {
        'uk-table-shrink': shrinked,
        'uk-table-expand': expanded
      }
    }), children)
  }
}
