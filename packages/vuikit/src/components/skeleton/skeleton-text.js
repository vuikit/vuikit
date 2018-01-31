import Skeleton from './ui/skeleton'
import dataMerge from 'vuikit/core/util/vue-data-merge'

export default {
  functional: true,
  props: Skeleton.props,
  render: (h, { data, props }) =>

    h(Skeleton, dataMerge(data, {
      class: 'vk-skeleton-text',
      props
    }))

}
