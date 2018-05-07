import ElSkeleton from './skeleton'
import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: ElSkeleton.props,
  render (h, { data, props }) {
    return h(ElSkeleton, mergeData(data, {
      class: 'vk-skeleton-title',
      props
    }))
  }
}
