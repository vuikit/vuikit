import dataMerge from '@vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  render: (h, { data, children }) =>
    h('span', dataMerge(data, { class: 'vk-tree-node__label' }), children)
}
