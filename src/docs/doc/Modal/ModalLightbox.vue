<template>
  <div>
    <vk-button
      @click="api.show = true"
      text="Open">
    </vk-button>
    <vk-modal-lightbox
      :show.sync="api.show"
      :block="api.block"
      :keyboard="api.keyboard"
      :center="api.center"
      :bg-close="api.bgClose"
      :hide-close="api.hideClose">
      <img src="../../assets/placeholder_600x400.svg">
    </vk-modal-lightbox>
    <div class="uk-margin-large">
      A variation if you want to use the modal as a lightbox for your images.
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
    api: Helper.getComponentPropsDefaults('ModalLightbox')
  }),
  computed: {
    demoCode: () => demoCode,
    eventsRows: function () {
      return this.$parent.$options.mainEventsInfo
    },
    propRows: function () {
      return merge({},
        Helper.getComponentProps('ModalLightbox'),
        this.$parent.$options.mainPropsInfo,
        propsInfo
      )
    }
  }
}

const demoCode =
`<vk-modal-lightbox>
  <img src="" alt="">
</vk-modal-lightbox>`

const propsInfo = {
  bgClose: {
    description: 'Determines whether or not the modal can be closed by clicking the background.'
  },
  hideClose: {
    description: 'Determines whether or not the close button is displayed.'
  }
}
</script>
