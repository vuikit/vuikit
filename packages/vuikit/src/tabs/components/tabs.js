import { assign } from '@vuikit/core/utils/lang'

import EventsMixin from '@vuikit/core/mixins/events'
import { Transition } from '@vuikit/core/components/transition'

import core from './core'
import { ElTabs } from '../elements'
import { TAB_ID } from '../constants'

export default {
  name: 'VkTabs',
  extends: core,
  mixins: [EventsMixin],
  props: ElTabs.props,
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
      h(ElTabs, { props: $props }, Tabs),
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
