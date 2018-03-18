import core from './core'
import { assign } from 'vuikit/src/util/lang'
import { Transition } from 'vuikit/src/core/transition'

import { TAB_ID } from '../constants'
import { ElementTabsVertical } from '../elements'

export default {
  name: 'VkTabsVertical',
  extends: core,
  props: ElementTabsVertical.props,
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
        h(ElementTabsVertical, { props: $props }, Tabs)
      ]),
      // content
      h('div', { class: 'uk-width-expand' }, [
        h(Transition, {
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
