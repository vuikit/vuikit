import ElementSkeleton from './skeleton'
import dataMerge from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: ElementSkeleton.props,
  render (h, { data, props }) {
    return h(ElementSkeleton, dataMerge(data, {
      class: 'vk-skeleton-text',
      props
    }))
  }
}
