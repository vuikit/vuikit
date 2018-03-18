import { mergeData } from 'vuikit/src/util/vue'
import { ElementSubnavItem } from '../elements'

export default {
  name: 'VkSubnavItem',
  functional: true,
  props: ElementSubnavItem.props,
  render (h, { props, data, parent }) {

    if (data.rerendering) {
      delete data.class
    }

    return h(ElementSubnavItem, mergeData(data, { props }, {
      rerender: true,
      on: {
        click: e => {
          e.preventDefault()
          parent.triggerUpdate(data.key)
        }
      }
    }))
  }
}
