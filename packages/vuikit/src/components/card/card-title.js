import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  render: (h, { data, children }) =>
    h('h3', mergeData(data, { class: 'uk-card-title' }), children)
}
