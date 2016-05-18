<template>
  <div>
    <vk-button
      @click="props.show.value = true"
      text="Open">
    </vk-button>
    <vk-modal-alert v-ref:demo
      :show.sync="props.show.value"
      :center="props.center.value"
      :block="props.block.value"
      :keyboard="props.keyboard.value"
      :text="props.block.value
        ? 'The alert is blocked, refresh the page to continue.'
        : 'Attention!'">
    </vk-modal-alert>
    <div class="uk-margin-large">
      An alternative for the native window.alert dialog.
    </div>
    <vk-tab-horizontal>
      <vk-tab title="Props">
        <table-api-props :rows="props"></table-api-props>
      </vk-tab>
      <vk-tab title="Events">
        <table-api-events :rows="events"></table-api-events>
      </vk-tab>
      <vk-tab title="Code">
        <pre><code v-encode="code"></code></pre>
      </vk-tab>
    </vk-tab-horizontal>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import { merge } from 'lodash'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: function () {
    return {
      props: merge(
        Helper.getProps('ModalAlert', this.$parent.$options.mainPropsInfo),
        props
      ),
      events: this.$parent.$options.mainEventsInfo,
      code
    }
  }
}

const code =
'<vk-modal-alert text="Text"></vk-modal-alert>'

const props = {
  text: {
    description: `The text for the modal content. For HTML use the
      <code>default</code> slot instead.`,
    editable: false
  }
}
</script>
