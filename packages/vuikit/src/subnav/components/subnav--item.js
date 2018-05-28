import { mergeData } from 'vuikit/src/_core/utils/vue'
import { ElSubnavItem } from '../elements'

export default {
  name: 'VkSubnavItem',
  functional: true,
  props: ElSubnavItem.props,
  render (h, { props, data, parent }) {

    if (data.rerendering) {
      delete data.class
    }

    return h(ElSubnavItem, mergeData(data, { props }, {
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
