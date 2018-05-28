import ElSkeleton from './skeleton'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: ElSkeleton.props,
  render (h, { data, props }) {
    return h(ElSkeleton, mergeData(data, {
      class: 'vk-skeleton-text',
      props
    }))
  }
}
