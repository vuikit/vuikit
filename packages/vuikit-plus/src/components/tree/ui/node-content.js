import dataMerge from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  render: (h, { data, children }) =>
    h('div', dataMerge(data, { class: 'vk-tree-node__content uk-flex-1' }), children)
}
