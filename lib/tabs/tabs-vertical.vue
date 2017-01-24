<template>
  <div class="uk-grid" :class="{
    'uk-flex uk-flex-row-reverse': alignment === 'right'
  }">
    <div class="uk-width-auto">
      <ul class="uk-tab" :class="[alignment === 'right'
        ? 'uk-tab-right'
        : 'uk-tab-left'
      ]">
        <slot></slot>
      </ul>
    </div>
    <div class="uk-width-expand">
      <transition :name="transition" mode="out-in">
        <div :key="activeTab">
          <tabcontent></tabcontent>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import core from './core'

export default {
  name: 'VkTabsVertical',
  extends: core,
  props: {
    alignment: {
      type: String,
      default: 'left' // left|right
    }
  }
}
</script>
