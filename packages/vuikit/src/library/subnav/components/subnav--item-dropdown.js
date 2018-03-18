import IconTriangeDown from 'vuikit/src/icons/triangle-down'
import { mergeData } from 'vuikit/src/util/vue'

import { Dropdown } from 'vuikit/src/library/dropdown'
import { ElementSubnavItemDropdown } from '../elements'

export default {
  name: 'VkSubnavItemDropdown',
  functional: true,
  props: mergeData({}, ElementSubnavItemDropdown.props, Dropdown.props, {
    mode: {
      type: String,
      default: 'click'
    }
  }),
  render (h, { props, children }) {
    const { title } = props

    return h(ElementSubnavItemDropdown, { props }, [
      h('a', {
        class: ['uk-icon']
      }, [
        title + ' ',
        h(IconTriangeDown)
      ]),
      h(Dropdown, {
        props
      }, [
        children
      ])
    ])
  }
}
