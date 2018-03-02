import VkIcon from './icon'
import Element from './elements/icon-button'

export default {
  name: 'VkIconButton',
  functional: true,
  props: VkIcon.props,
  render (h, { data, props, children }) {
    return h(Element, data, [
      h(`icon-${props.icon}`, { props })
    ])
  }
}
