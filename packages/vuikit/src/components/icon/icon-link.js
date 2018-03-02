import VkIcon from './icon'
import Element from './elements/icon-link'
import { assign } from 'vuikit/src/util/lang'

export default {
  name: 'VkIconLink',
  functional: true,
  props: assign({}, VkIcon.props, Element.props),
  render (h, { data, props, children }) {
    return h(Element, assign(data, { props }), [
      h(`icon-${props.icon}`, { props })
    ])
  }
}
