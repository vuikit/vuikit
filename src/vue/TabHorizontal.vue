<template>
  <div :class="{
    'uk-flex uk-flex-column-reverse': bottom
  }">
    <div :class="{
      'uk-tab-center': center,
      'uk-tab-center-bottom': center && bottom
    }">
      <tab-tabs
        :connect="id"
        :items="tabs"
        :width="width"
        :class="{
          'uk-tab-grid': true,
          'uk-tab-flip': flip,
          'uk-tab-bottom': bottom
        }">
      </tab-tabs>
    </div>
    <ul class="uk-switcher uk-margin"
      :id="id">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import TabTabs from './TabTabs'
import UI from 'uikit'

export default {
  components: {
    TabTabs
  },
  props: {
    // align tabs right and in reversed order
    flip: {
      type: Boolean,
      default: false
    },
    // center the tabs
    center: {
      type: Boolean,
      default: false
    },
    // place the tabs at the bottom
    bottom: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    id: function () {
      return `vk-tabs-${this._uid}`
    },
    tabs: function () {
      return this.$children.filter((item, index) =>
        item.$options.name === 'VkTab'
      )
    }
  },
  ready () {
    UI.$(this.$el).on('change.uk.tab', () => {
      this.$emit('change')
    })
  }
}
</script>
