import IconTriangeDown from '@vuikit/icons/triangle-down'
import { assign } from '@vuikit/utils/lang'

import { Dropdown } from 'vuikit/src/dropdown'
import { ElSubnavItemDropdown } from '../elements'

export default {
  name: 'VkSubnavItemDropdown',
  functional: true,
  props: assign({}, ElSubnavItemDropdown.props, Dropdown.props, {
    mode: {
      type: String,
      default: 'click'
    }
  }),
  render (h, { props, children }) {
    const { title } = props

    return h(ElSubnavItemDropdown, { props }, [
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
