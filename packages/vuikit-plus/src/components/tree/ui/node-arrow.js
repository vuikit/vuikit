import dataMerge from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  props: ['rotated'],
  render: (h, { data, props }) =>
    h('span', dataMerge(data, {
      class: ['vk-tree-node__arrow', {
        'vk-tree-node__arrow--rotated': props.rotated
      }]
    }), [
      h('span')
    ])
}
