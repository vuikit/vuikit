import mergeData from 'vuikit/core/util/vue-data-merge'

export default {
  functional: true,
  render: (h, { data, children }) =>
    h('ul', mergeData(data, { class: 'uk-iconnav uk-iconnav-vertical' }), children)
}
