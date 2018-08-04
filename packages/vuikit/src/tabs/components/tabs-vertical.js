import core from '../core'
import { assign } from 'vuikit/src/_core/utils/object'
import { VkTransition } from 'vuikit/src/transition'

import { TAB_ID } from '../constants'
import { VkTabsElVertical } from '../elements'

export default {
  extends: core,
  props: VkTabsElVertical.props,
  render (h) {
    const { align, animation, keepAlive, $props } = this

    const Tabs = this.getTabs().map((node, index) => {
      const Tab = {
        functional: true,
        render: node.componentOptions.Ctor.options.tabRender
      }

      return h(Tab, {
        [TAB_ID]: node.data[TAB_ID],
        props: assign({}, node.componentOptions.propsData, {
          active: this.isActive(node.data[TAB_ID])
        })
      })
    })

    return h('div', {
      class: ['uk-grid', {
        'uk-flex uk-flex-row-reverse': align === 'right'
      }]
    }, [
      // tabs
      h('div', { class: 'uk-width-auto' }, [
        h(VkTabsElVertical, { props: $props }, Tabs)
      ]),
      // content
      h('div', { class: 'uk-width-expand' }, [
        h(VkTransition, {
          props: { name: animation }
        }, [
          keepAlive
            ? h('keep-alive', [ this.activeTabContent ])
            : this.activeTabContent
        ])
      ])
    ])
  }
}
