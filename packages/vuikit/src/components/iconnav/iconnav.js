import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  render: (h, { data, children }) =>
    h('ul', mergeData(data, { class: 'uk-iconnav' }), children)
}
