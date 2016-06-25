<template>
  <div class="uk-block">
    <h2>Modal Alert</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button
      @click="props.show.demo.value = true">
      Open
    </vk-button>
    <vk-modal-alert v-ref:demo
      :show.sync="props.show.demo.value"
      :center="props.center.demo.value"
      :block="props.block.demo.value"
      :keyboard="props.keyboard.demo.value">
      {{ props.block.demo.value
        ? 'The alert is blocked, refresh the page to continue.'
        : 'Attention!' }}
    </vk-modal-alert>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-modal-alert</code> component is an alternative for the native window.alert dialog.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events
          :events="events"
          :connect="$refs.demo">
        </vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>
<vk-modal-alert>
  Attention!
</vk-modal-alert>
        </vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import events from './events'
import commonProps from './props'
import ModalBase from '../../lib/ModalBase'

export default {
  data () {
    return {
      props: merge({}, commonProps, pick(ModalBase.props, Object.keys(commonProps))),
      slots,
      events
    }
  }
}

const slots = {
  default: {
    description: 'The main content.'
  }
}
</script>
