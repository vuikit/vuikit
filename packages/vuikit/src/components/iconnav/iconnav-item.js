import Element from './elements/iconnav-item'
import mergeData from 'vuikit/src/util/vue-data-merge'
import { assign } from 'vuikit/src/util/lang'

export default {
  name: 'VkIconnavItem',
  functional: true,
  props: assign({
    icon: {
      type: String,
      required: true
    }
  }, Element.props),
  render (h, { data, props }) {
    return h(Element, mergeData(data, { props }), [
      h(`vk-icons-${props.icon}`)
    ])
  }
}
