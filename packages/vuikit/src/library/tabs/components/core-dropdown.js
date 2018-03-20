import { isUndefined, assign } from 'vuikit/src/util/lang'

import { Dropdown } from 'vuikit/src/library/dropdown'
import { ElementNavDropdown, ElementNavItem } from 'vuikit/src/library/nav'

import { TAB_ID } from '../constants'
import { ElementTabItemDropdown } from '../elements'

export default {
  render (h) {
    const nodes = this.$slots.default || []

    const NavItems = nodes.map(node => {
      const props = node.componentOptions.propsData

      return h(ElementNavItem, {
        props: assign({}, props, {
          active: this.$parent.isActive(node.data[TAB_ID])
        }),
        class: {
          'uk-disabled': !isUndefined(props.disabled)
        },
        on: {
          click: e => {
            e.preventDefault()
            this.$parent.setActiveTab(node.data[TAB_ID])
          }
        }
      })
    })

    return h(ElementTabItemDropdown, {
      props: {
        active: nodes.some(node => this.$parent.isActive(node.data[TAB_ID]))
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
