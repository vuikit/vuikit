<template>
  <div class="uk-grid" :class="{
    'uk-flex uk-flex-row-reverse': alignment === 'right'
  }">
    <div class="uk-width-auto">
      <ui-tab :alignment="alignment">
        <ui-tab-item v-for="tab in tabs"
          :active="tab.name === activeTab"
          :key="tab.name"
          :label="tab.label"
          :disabled="tab.disabled"
          @click.prevent="!tab.disabled && triggerTab(tab.name)"
        ></ui-tab-item>
      </ui-tab>
    </div>
    <div class="uk-width-expand">
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
import UiTab from './ui/tab-vertical'
import UiTabItem from './ui/tab-item'

export default {
  name: 'TabVertical',
  extends: core,
  components: {
    UiTab,
    UiTabItem
  },
  props: UiTab.props
}
</script>
