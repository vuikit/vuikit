import dataMerge from '@vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  render: (h, { data }) =>
    h('span', dataMerge(data, { class: 'vk-tree-node__indent' }))
}
