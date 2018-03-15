import ElementSkeleton from './skeleton'
import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  props: ElementSkeleton.props,
  render (h, { data, props }) {
    return h(ElementSkeleton, mergeData(data, {
      class: 'vk-skeleton-title',
      props
    }))
  }
}
