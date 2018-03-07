import Element from './elements/nav-item'
import mergeData from 'vuikit/src/util/vue-data-merge'
import { assign } from 'vuikit/src/util/lang'

export default {
  name: 'VkNavItem',
  functional: true,
  props: assign({}, Element.props, {
    icon: {
      type: String
    }
  }),
  render (h, { data, props }) {
    props.icon = props.icon && h(`vk-icons-${props.icon}`)

    return h(Element, mergeData(data, { props }))
  }
}
