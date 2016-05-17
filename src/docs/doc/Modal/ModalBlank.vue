<template>
  <div>
    <vk-button
      @click="api.show = true"
      text="Open">
    </vk-button>
    <vk-modal-blank
      :show.sync="api.show"
      :block="api.block"
      :keyboard="api.keyboard"
      :center="api.center"
      :bg-close="api.bgClose"
      :hide-close="api.hideClose">
      <div class="uk-grid uk-flex-middle" data-uk-grid-margin>
        <div class="uk-width-medium-1-2 uk-height-viewport uk-cover-background uk-row-first"
          :style="{'background-image': 'url(' + image + ')'}">
        </div>
        <div class="uk-width-medium-1-2">
          <h1>Headline</h1>
          <div class="uk-width-medium-1-3">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </vk-modal-blank>
    <div class="uk-margin-large">
      A variation that resets all styling, like padding and margin. Useful if you want to create a fullscreen modal.
    </div>
    <vk-tab-horizontal>
      <vk-tab title="Props">
        <table-api-props :rows="propRows" :values="$data.api"></table-api-props>
      </vk-tab>
      <vk-tab title="Events">
        <table-api-events :rows="eventsRows"></table-api-events>
      </vk-tab>
      <vk-tab title="Code">
        <pre><code v-encode></code></pre>
      </vk-tab>
    </vk-tab-horizontal>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import { merge } from 'lodash'

export default {
  data: () => ({
    api: Helper.getComponentPropsDefaults('ModalBlank'),
    image: require('../../assets/placeholder_600x400.svg')
  }),
  computed: {
    demoCode: () => demoCode,
    eventsRows: function () {
      return this.$parent.$options.mainEventsInfo
    },
    propRows: function () {
      return merge({},
        Helper.getComponentProps('ModalBlank'),
        this.$parent.$options.mainPropsInfo
      )
    }
  }
}

const demoCode =
`<vk-modal-blank>
  <div class="uk-grid uk-flex-middle" data-uk-grid-margin>
    <div class="uk-width-medium-1-2 uk-height-viewport uk-cover-background uk-row-first"
      style="background-image: url(...)">
    </div>
    <div class="uk-width-medium-1-2">
      <h1>Headline</h1>
      <div class="uk-width-medium-1-3">
        ...
      </div>
    </div>
  </div>
</vk-modal-blank>`
</script>
