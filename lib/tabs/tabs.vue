<template>
  <div :class="{
    'uk-flex uk-flex-column-reverse': bottom
  }">
    <ul class="uk-tab" :class="{
      [`uk-child-width-1-${tabs.length}`]: alignment === 'justify',
      'uk-flex-right': alignment === 'right',
      'uk-flex-center': alignment === 'center',
      'uk-tab-bottom uk-margin-remove-bottom': bottom
    }">
      <li v-for="{ id, label, disabled } in tabs" :class="{
        'uk-active': activeTab === id,
        'uk-disabled': disabled
      }">
        <a @click.prevent="!disabled && $emit('change', id)">
          {{ label }}
        </a>
      </li>
    </ul>
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

export default {
  name: 'VkTabs',
  extends: core,
  props: {
    alignment: {
      type: String,
      default: 'left' // left|right|center|justify
    },
    // flips tabs vertically
    bottom: {
      type: Boolean,
      default: false
    }
  }
}
</script>
