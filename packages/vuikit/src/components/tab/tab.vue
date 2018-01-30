<template>
  <div :class="{
    'uk-flex uk-flex-column-reverse': bottom
  }">
    <ui-tab
      :bottom="bottom"
      :alignment="alignment"
    >
      <ui-tab-item v-for="(tab, index) in tabs"
        :active="tab.id === state.activeTab"
        :key="`${tab.id}_${index}`"
        :label="tab.label"
        :disabled="tab.disabled"
        @click.prevent="!tab.disabled && triggerTab(tab.id)"
      ></ui-tab-item>
    </ui-tab>
    <div :class="{ 'uk-margin': bottom }">
      <transition :name="transition" mode="out-in">
        <keep-alive>
          <tab-content></tab-content>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import core from './core'
import UiTab from './ui/tab'
import UiTabItem from './ui/tab-item'

export default {
  name: 'Tab',
  extends: core,
  components: {
    UiTab,
    UiTabItem
  },
  props: UiTab.props
}
</script>
