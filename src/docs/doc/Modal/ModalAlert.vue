<template>
  <div>
    <vk-button
      @click="api.show = true"
      text="Open">
    </vk-button>
    <vk-modal-alert
      :show.sync="api.show"
      :center="api.center"
      :block="api.block"
      :keyboard="api.keyboard"
      :text="api.block
        ? 'The alert is blocked, refresh the page to continue.'
        : 'Attention!'">
    </vk-modal-alert>
    <div class="uk-margin-large">
      An alternative for the native window.alert dialog.
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
    api: Helper.getComponentPropsDefaults('ModalAlert')
  }),
  computed: {
    demoCode: () => demoCode,
    eventsRows: function () {
      return this.$parent.$options.mainEventsInfo
    },
    propRows: function () {
      return merge({},
        Helper.getComponentProps('ModalAlert'),
        this.$parent.$options.mainPropsInfo,
        propsInfo
      )
    }
  }
}

const demoCode =
'<vk-modal-alert text="..."></vk-modal-alert>'

const propsInfo = {
  text: {
    description: `The text for the modal content. For HTML use the
      <code>default</code> slot instead.`,
    editable: false
  }
}
</script>
