<template>
  <div :class="{
    'uk-flex uk-flex-column-reverse': bottom
  }">
    <div :class="{
      'uk-tab-center': center,
      'uk-tab-center-bottom': center && bottom
    }">
      <ul class="uk-tab"
        :data-uk-tab="{ connect: '#' + id } | json"
        :class="{
          'uk-tab-grid': width,
          'uk-tab-flip': flip,
          'uk-tab-bottom': bottom
        }">
        <tab-header
          v-for="tab in tabs"
          :label="tab.label"
          :width="width"
          :disabled="tab.disabled">
        </tab-header>
      </ul>
    </div>
    <ul class="uk-switcher uk-margin"
      :id="id"
      v-el:tabs-body>
      <slot></slot>
    </ul>
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
    // tabs width using UIkit grid
    width: {
      type: String,
      default: ''
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
