import { mergeData } from 'vuikit/src/_core/utils/vue'
import { VkSubnavElItem } from '../elements'

export default {
  functional: true,
  props: VkSubnavElItem.props,
  render (h, { props, data, parent }) {
    if (data.rerendering) {
      delete data.class
    }

    return h(VkSubnavElItem, mergeData(data, { props }, {
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
