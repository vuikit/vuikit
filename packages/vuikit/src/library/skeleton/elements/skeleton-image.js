import ElementSkeleton from './skeleton'
import { mergeData } from 'vuikit/src/util/vue'
import { assign } from 'vuikit/src/util/lang'

export default {
  functional: true,
  props: assign({}, ElementSkeleton.props, {
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
    return h(ElementSkeleton, mergeData(data, {
      class: 'vk-skeleton-image',
      props
    }))
  }
}
