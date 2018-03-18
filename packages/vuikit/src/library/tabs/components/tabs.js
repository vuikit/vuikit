import { assign } from 'vuikit/src/util/lang'

import EventsMixin from 'vuikit/src/mixins/events'
import { Transition } from 'vuikit/src/core/transition'

import core from './core'
import { ElementTabs } from '../elements'
import { TAB_ID } from '../constants'

export default {
  name: 'VkTabs',
  extends: core,
  mixins: [EventsMixin],
  props: ElementTabs.props,
  render (h) {
    const { flipped, animation, keepAlive, $props } = this

    let Tabs = this.getTabs()

    Tabs = Tabs.map((node, index) => {
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
      class: {
        'uk-flex uk-flex-column-reverse': flipped
      }
    }, [
      h(ElementTabs, { props: $props }, Tabs),
      h('div', {
        class: { 'uk-margin': flipped }
      }, [
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
