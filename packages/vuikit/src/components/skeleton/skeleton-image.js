import Skeleton from './ui/skeleton'
import dataMerge from 'vuikit/core/helpers/vue-data-merge'

export default {
  functional: true,
  props: dataMerge(Skeleton.props, {
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 120
    }
  }),
  render: (h, { data, props }) =>

    h(Skeleton, dataMerge(data, {
      class: 'vk-skeleton-image',
      props
    }))

}
