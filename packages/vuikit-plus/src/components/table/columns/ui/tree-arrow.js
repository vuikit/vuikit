import dataMerge from '@vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  props: ['rotated'],
  render: (h, { data, props }) =>
    h('span', dataMerge(data, {
      class: ['vk-table-column-tree__arrow', {
        'vk-table-column-tree__arrow--rotated': props.rotated
      }]
    }))
}
