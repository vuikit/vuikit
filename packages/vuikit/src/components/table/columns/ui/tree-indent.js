import dataMerge from 'vuikit/core/util/vue-data-merge'

export default {
  functional: true,
  render: (h, { data, children }) =>
    h('span', dataMerge(data, { class: 'vk-table-column-tree__indent' }), children)
}
