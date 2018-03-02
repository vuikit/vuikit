import { width } from 'vuikit/src/util/dimensions'
import { findAll } from 'vuikit/src/util/selector'
import { assign, debounce } from 'vuikit/src/util/lang'

import core from './core'
import ElementTabs from './elements/tabs'
import CoreDropdown from './core-dropdown'
import EventsMixin from 'vuikit/src/mixins/events'
import { Transition } from 'vuikit/src/components/transition'

import { TAB_ID } from './constants'

export default {
  name: 'VkTabs',
  extends: core,
  mixins: [EventsMixin],
  props: assign({}, ElementTabs.props, {
    group: {
      type: Boolean,
      default: false
    }
  }),
  data: () => ({
    groupCount: false
  }),
  methods: {
    calculateTabGrouping () {
      let group

      const TabsContainerWidth = width(this.$el)
      const TabsWidths = findAll('li', this.$el).map(el => width(el))

      TabsWidths.reduce((r, width, index) => {
        const total = r + width

        if (total < TabsContainerWidth) {
          group = index
        }

        return total
      }, 0)

      // rest always one so the dropdown tab can fit
      if (group) {
        this.groupCount = group - 1
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.calculateTabGrouping()
    })
    this.on(window, 'resize', debounce(() =>
      this.$nextTick(this.calculateTabGrouping), 20, true)
    )
  },
  render (h) {
    const { flipped, animation, keepAlive, $props } = this

    let Tabs = this.getTabs()
    const TabsInDropdown = this.group && this.groupCount && Tabs.splice(this.groupCount)

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

    if (TabsInDropdown.length) {
      Tabs.push(h(CoreDropdown, TabsInDropdown))
    }

    return h('div', {
      class: {
        'uk-flex uk-flex-column-reverse': flipped
      }
    }, [
      // tabs
      h(ElementTabs, { props: $props }, Tabs),
      // content
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
