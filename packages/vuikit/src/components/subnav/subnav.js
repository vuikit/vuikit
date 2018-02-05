import UiSubnav from './ui/subnav'
import { warn } from 'vuikit/src/util/debug'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  functional: true,
  props: UiSubnav.props,
  render (h, { data, props, children, listeners, parent }) {
    const items = children.filter(n => n.tag)

    if (!data.model) {
      warn('VkSubnav is missing the v-model declaration.')
      return false
    }

    const selectedItem = data.model.value

    items.forEach((item, index) => {
      const name = item.data.props.name || index
      const isActive = selectedItem === name

      if (isActive) {
        // workaround to mark as active
        item.data.class.push('uk-active')
      }

      item.data.on = {
        click: () => listeners.input(name)
      }
    })

    return h(UiSubnav, mergeData(data, { props }), children)
  }
}
