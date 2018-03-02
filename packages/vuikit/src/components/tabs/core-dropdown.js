import ElementTabDropdown from './elements/tabs-item-dropdown'
import { isDef, assign } from 'vuikit/src/util/lang'

import { Dropdown } from 'vuikit/src/components/dropdown'
import { ElementNavDropdown, ElementNavItem } from 'vuikit/src/components/nav'

import { TAB_ID } from './constants'

export default {
  render (h) {
    const NavItems = this.$slots.default.map(node => {
      const props = node.componentOptions.propsData

      return h(ElementNavItem, {
        props: assign({}, props, {
          active: this.$parent.isActive(node.data[TAB_ID])
        }),
        class: {
          'uk-disabled': isDef(props.disabled)
        },
        on: {
          click: e => {
            e.preventDefault()
            this.$parent.setActiveTab(node.data[TAB_ID])
          }
        }
      })
    })

    return h(ElementTabDropdown, {
      props: {
        active: this.$slots.default.some(node => this.$parent.isActive(node.data[TAB_ID]))
      }
    }, [
      h(Dropdown, {
        props: {
          mode: 'click'
        }
      }, [
        h(ElementNavDropdown, NavItems)
      ])
    ])
  }
}
