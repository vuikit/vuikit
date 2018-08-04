import { assign } from 'vuikit/src/_core/utils/object'

import EventsMixin from 'vuikit/src/_core/mixins/events'
import { VkTransition } from 'vuikit/src/transition'

import core from '../core'
import { VkTabsEl } from '../elements'
import { TAB_ID } from '../constants'

export default {
  extends: core,
  mixins: [EventsMixin],
  props: VkTabsEl.props,
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
      h(VkTabsEl, { props: $props }, Tabs),
      h('div', {
        class: { 'uk-margin': flipped }
      }, [
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
