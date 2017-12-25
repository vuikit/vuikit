import mergeData from '@vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  props: {
    rotated: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { data, props }) =>

    h('span', mergeData(data, {
      class: ['vk-table-column-sort__arrow', {
        'vk-table-column-sort__arrow--rotated': props.rotated
      }]
    }))

}
