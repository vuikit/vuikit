<template>
  <div>
    <vk-button
      @click="(api.show = true) && ($refs.modal.state = false)"
      :text="buttonText">
    </vk-button>
    <vk-modal-confirm v-ref:modal
      :show.sync="api.show"
      :center="api.center"
      :block="api.block"
      :keyboard="api.keyboard"
      @confirm="buttonText = 'Confirmed'"
      @dismiss="buttonText = 'Dismissed'"
      :text="api.block
        ? 'The modal is blocked, refresh the page to continue.'
        : 'Are you sure?'">
    </vk-modal-confirm>
    <div class="uk-margin-large">
      An alternative for the native window.confirm dialog.
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
    api: Helper.getPropsDefaults(Helper.getProps('ModalConfirm')),
    buttonText: 'Open'
  }),
  computed: {
    demoCode: () => demoCode,
    eventsRows: function () {
      return this.$parent.$options.mainEventsInfo
    },
    propRows: function () {
      return merge({},
        Helper.getProps('ModalConfirm'),
        this.$parent.$options.mainPropsInfo,
        propsInfo
      )
    }
  }
}

const demoCode =
'<vk-modal-confirm text="..."></vk-modal-confirm>'

const propsInfo = {
  text: {
    description: `The text for the modal content. For HTML use the
      <code>default</code> slot instead.`,
    editable: false
  }
}
</script>
