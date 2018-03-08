import Element from './elements/subnav-item'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  name: 'VkSubnavItem',
  functional: true,
  props: Element.props,
  render (h, { props, data, parent }) {

    if (data.rerendering) {
      delete data.class
    }

    return h(Element, mergeData(data, { props }, {
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
