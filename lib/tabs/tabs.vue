<template>
  <div :class="{
    'uk-flex uk-flex-column-reverse': bottom
  }">
    <ul class="uk-tab" :class="{
      [`uk-child-width-1-${tabs.length}`]: alignment === 'justify',
      'uk-flex-right': alignment === 'right',
      'uk-flex-center': alignment === 'center',
      'uk-tab-bottom': bottom
    }">
      <slot></slot>
    </ul>
    <transition :name="transition" mode="out-in">
      <div class="uk-margin" :key="activeTab">
        <tabcontent></tabcontent>
      </div>
    </transition>
  </div>
</template>

<script>
import core from './core'

export default {
  name: 'VkTabs',
  extends: core,
  props: {
    alignment: {
      type: String,
      default: 'left' // left|right|center|justify
    },
    // flips the tabs vertically
    bottom: {
      type: Boolean,
      default: false
    }
  }
}
</script>
