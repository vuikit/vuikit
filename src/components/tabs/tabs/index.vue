<template>
  <div :class="{
    'uk-flex uk-flex-column-reverse': bottom
  }">
    <ul class="uk-tab" :class="classes">
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
import core from '../core'

export default {
  name: 'Tabs',
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
  },
  computed: {
    classes () {
      const cls = {
        'uk-flex-right': this.alignment === 'right',
        'uk-flex-center': this.alignment === 'center',
        'uk-tab-bottom uk-margin-remove-bottom': this.bottom
      }

      cls[`uk-child-width-1-${this.tabs.length}`] = this.alignment === 'justify'

      return cls
    }
  }
}
</script>
