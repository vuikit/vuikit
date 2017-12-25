import mergeData from '@vuikit/core/helpers/vue-data-merge'

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
    const def = mergeData(data, {
      class: {
        'uk-table-shrink': props.shrinked,
        'uk-table-expand': props.expanded
      }
    })

    return h('th', def, children)
  }
}
