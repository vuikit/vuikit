import ElSkeleton from './skeleton'
import { mergeData } from '@vuikit/utils/vue'
import { assign } from '@vuikit/utils/lang'

export default {
  functional: true,
  props: assign({}, ElSkeleton.props, {
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 120
    }
  }),
  render (h, { data, props }) {
    return h(ElSkeleton, mergeData(data, {
      class: 'vk-skeleton-image',
      props
    }))
  }
}
