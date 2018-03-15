import Element from './elements/navbar-nav-item'
import { mergeData } from 'vuikit/src/util/vue'
import { assign } from 'vuikit/src/util/lang'

export default {
  name: 'VkNavbarNavItem',
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
