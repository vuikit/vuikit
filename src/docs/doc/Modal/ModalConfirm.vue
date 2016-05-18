<template>
  <div>
    <vk-button
      @click="(props.show.value = true) && ($refs.modal.state = false)"
      :text="buttonText">
    </vk-button>
    <vk-modal-confirm v-ref:demo
      :show.sync="props.show.value"
      :center="props.center.value"
      :block="props.block.value"
      :keyboard="props.keyboard.value"
      @confirm="buttonText = 'Confirmed'"
      @dismiss="buttonText = 'Dismissed'"
      :text="props.block.value
        ? 'The modal is blocked, refresh the page to continue.'
        : 'Are you sure?'">
    </vk-modal-confirm>
    <div class="uk-margin-large">
      An alternative for the native window.confirm dialog.
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
      buttonText: 'Open',
      props: merge(
        Helper.getProps('ModalConfirm', this.$parent.$options.mainPropsInfo),
        props
      ),
      events: this.$parent.$options.mainEventsInfo,
      code
    }
  }
}

const code =
'<vk-modal-confirm text="Text"></vk-modal-confirm>'

const props = {
  text: {
    description: `The text for the modal content. For HTML use the
      <code>default</code> slot instead.`,
    editable: false
  }
}
</script>
