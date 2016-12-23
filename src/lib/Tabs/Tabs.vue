<template>
  <div :class="{
    'uk-flex uk-flex-column-reverse': bottom
  }">
    <div :class="{
      'uk-tab-center': center,
      'uk-tab-center-bottom': center && bottom
    }">
      <ul class="uk-tab" :class="{
        'uk-tab-grid': width,
        'uk-tab-flip': flip,
        'uk-tab-bottom': bottom
      }">
        <slot />
      </ul>
    </div>
    <transition :name="transition" mode="out-in">
      <div class="uk-margin" :key="activeTab">
        <TabContent />
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
    // tabs width using UIkit grid
    width: {
      type: String,
      default: ''
    }
  },
  beforeMount () {
    this.updateTabs()
  },
  beforeUpdate () {
    this.updateTabs()
  },
  methods: {
    updateTabs () {
      this.$slots.default.filter(c => c.tag).forEach((tab, index) => {
        if (this.width) {
          tab.data.staticClass = `uk-width-${this.width}`
        }
      })
    }
  }
}
</script>
