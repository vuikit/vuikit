import { isUndefined, assign } from '@vuikit/utils/lang'

import { Dropdown } from 'vuikit/src/dropdown'
import { ElNavDropdown, ElNavItem } from 'vuikit/src/nav'

import { TAB_ID } from '../constants'
import { ElTabItemDropdown } from '../elements'

export default {
  render (h) {
    const nodes = this.$slots.default || []

    const NavItems = nodes.map(node => {
      const props = node.componentOptions.propsData

      return h(ElNavItem, {
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

    return h(ElTabItemDropdown, {
      props: {
        active: nodes.some(node => this.$parent.isActive(node.data[TAB_ID]))
      }
    }, [
      h(Dropdown, {
        props: {
          mode: 'click'
        }
      }, [
        h(ElNavDropdown, NavItems)
      ])
    ])
  }
}
