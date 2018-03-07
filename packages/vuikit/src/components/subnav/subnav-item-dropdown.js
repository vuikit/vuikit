import VkDropdown from 'vuikit/src/components/dropdown/dropdown'
import IconTriangeDown from 'vuikit/src/icons/triangle-down'

import Element from './elements/subnav-item-dropdown'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  name: 'VkSubnavItemDropdown',
  functional: true,
  props: mergeData({}, Element.props, VkDropdown.props, {
    mode: {
      type: String,
      default: 'click'
    }
  }),
  render (h, { props, children }) {
    const { title } = props

    return h(Element, { props }, [
      h('a', {
        class: ['uk-icon']
      }, [
        title + ' ',
        h(IconTriangeDown)
      ]),
      h(VkDropdown, {
        props
      }, [
        children
      ])
    ])
  }
}
