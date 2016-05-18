<template>
  <div class="uk-grid"
    :class="{
      'uk-flex uk-flex-row-reverse': align === 'right'
    }">
    <div :class="'uk-width-medium-' + tabsWidth">
      <tab-tabs
        :connect="id"
        :items="tabs"
        :class="{
          'uk-tab-left': align === 'left',
          'uk-tab-right': align === 'right'
        }">
      </tab-tabs>
    </div>
    <div :class="'uk-width-medium-' + contentWidth">
      <ul class="uk-switcher uk-margin"
        :id="id">
        <slot></slot>
      </ul>
    </div>
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
    align: {
      type: String,
      default: 'left'
    },
    tabsWidth: {
      type: String,
      default: '1-3'
    },
    contentWidth: {
      type: String,
      default: '2-3'
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
