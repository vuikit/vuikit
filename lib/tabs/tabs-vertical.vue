<template>
  <div class="uk-grid" :class="{
    'uk-flex uk-flex-row-reverse': alignment === 'right'
  }">
    <div class="uk-width-auto">
      <ul class="uk-tab" :class="[alignment === 'right'
        ? 'uk-tab-right'
        : 'uk-tab-left'
      ]">
        <li v-for="{ id, label, disabled } in tabs" :class="{
          'uk-active': activeTab === id,
          'uk-disabled': disabled
        }">
          <a @click.prevent="!disabled && $emit('change', id)">
            {{ label }}
          </a>
        </li>
      </ul>
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
