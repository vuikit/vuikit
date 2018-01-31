import mergeData from 'vuikit/core/util/vue-data-merge'

export default {
  functional: true,
  render: (h, { props, data, children }) => {
    return h('ul', mergeData(data, {
      class: 'uk-breadcrumb'
    }), children)
  }
}
