import Skeleton from './ui/skeleton'
import dataMerge from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: Skeleton.props,
  render: (h, { data, props }) =>

    h(Skeleton, dataMerge(data, {
      class: 'vk-skeleton-title',
      props
    }))

}
