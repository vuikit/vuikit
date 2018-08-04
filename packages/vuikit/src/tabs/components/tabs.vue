<template>
  <div :class="{
    'uk-flex uk-flex-column-reverse': flipped
  }">
    <VkTabsEl
      v-bind="pickComponentProps($props, 'VkTabsEl')"
    >
      <VkTabsElTab v-for="(tab, tabIndex) in tabs" :key="tabIndex"
        :active="isActive(tab.key)"
        @click="setAsActive(tab.key)"
        v-bind="pickComponentProps(tab.props, 'VkTabsElTab')"
      />
    </VkTabsEl>
    <VkTransition :name="animation">
      <KeepAlive :include="keepAlive ? null : '-'">
        <component :is="{
          functional: true, render: h => activeTabNode
        }"/>
      </KeepAlive>
    </VkTransition>
  </div>
</template>

<script>
import { assign } from 'vuikit/src/_core/utils/object'

import mixinProps from 'vuikit/src/_core/mixins/props'

import core from '../core'
import { VkTransition } from 'vuikit/src/transition'
import { VkTabsEl, VkTabsElTab } from '../elements'

export default {
  extends: core,
  mixins: [mixinProps],
  props: assign({}, VkTabsEl.props, {
    animation: VkTransition.props.name,
    keepAlive: Boolean
  }),
  components: {
    VkTabsEl,
    VkTabsElTab,
    VkTransition
  },
  created () {
    // set initially activeTab
    if (this.activeTab === undefined) {
      this.activeKey = this.tabs.shift().key
    }
  }
}
</script>
