<template>
  <div :class="['uk-grid', {
    'uk-flex uk-flex-row-reverse': align === 'right'
  }]">
    <div class="uk-width-auto">
      <VkTabsElVertical
        v-bind="pickComponentProps($props, 'VkTabsElVertical')"
      >
        <VkTabsElTab v-for="(tab, tabIndex) in tabs" :key="tabIndex"
          :active="isActive(tab.key)"
          @click="setAsActive(tab.key)"
          v-bind="pickComponentProps(tab.props, 'VkTabsElTab')"
        />
      </VkTabsElVertical>
    </div>
    <div class="uk-width-expand">
      <VkTransition :name="animation">
        <KeepAlive :include="keepAlive ? null : '-'">
          <component :is="{
            functional: true, render: h => activeTabNode
          }"/>
        </KeepAlive>
      </VkTransition>
    </div>
  </div>
</template>

<script>
import { assign } from 'vuikit/src/_core/utils/object'

import mixinProps from 'vuikit/src/_core/mixins/props'

import core from '../core'
import { VkTransition } from 'vuikit/src/transition'
import { VkTabsElVertical, VkTabsElTab } from '../elements'

export default {
  name: 'VkTabsVertical',
  extends: core,
  mixins: [mixinProps],
  props: assign({}, VkTabsElVertical.props, {
    animation: VkTransition.props.name,
    keepAlive: Boolean
  }),
  components: {
    VkTabsElTab,
    VkTabsElVertical,
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
