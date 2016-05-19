<template>
  <div class="uk-grid"
    :class="{
      'uk-flex uk-flex-row-reverse': align === 'right'
    }">
    <div :class="'uk-width-medium-' + headerWidth">
      <ul class="uk-tab"
        :data-uk-tab="{ connect: '#' + id } | json"
        :class="{
          'uk-tab-left': align === 'left',
          'uk-tab-right': align === 'right'
        }">
        <tab-header
          v-for="tab in tabs"
          :label="tab.label"
          :disabled="tab.disabled">
        </tab-header>
      </ul>
    </div>
    <div :class="'uk-width-medium-' + bodyWidth">
      <ul class="uk-switcher uk-margin"
        :id="id"
        v-el:tabs-body>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import TabHeader from './TabHeader'
import UI from 'uikit'
import Vue from 'vue'

export default {
  components: {
    TabHeader
  },
  props: {
    align: {
      type: String,
      default: 'left'
    },
    headerWidth: {
      type: String,
      default: '1-3'
    },
    bodyWidth: {
      type: String,
      default: '2-3'
    }
  },
  data: () => ({
    tabs: []
  }),
  computed: {
    id: function () {
      return `vk-tabs-${this._uid}`
    }
  },
  ready () {
    // workaround to preserve the tabs order which seems is
    // altered when used v-if with vk-tab
    this.tabs = Vue.util.toArray(this.$els.tabsBody.querySelectorAll('li'))
      .map(el => el.__vue__)
    // on tab change
    UI.$(this.$el).on('change.uk.tab', () => {
      this.$emit('change')
    })
  }
}
</script>
