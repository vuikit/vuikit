<template>
  <docs-page
    component="modal-alert"
    code-slot="Attention!"
    :props="props"
    :slots="slots"
    :events="events">
    <div slot="demo">
      <vk-button
        @click="props.show.value = true">
        Open
      </vk-button>
      <vk-modal-alert v-ref:demo
        :show.sync="props.show.value"
        :center="props.center.value"
        :block="props.block.value"
        :keyboard="props.keyboard.value">
        {{ props.block.value
          ? 'The alert is blocked, refresh the page to continue.'
          : 'Attention!' }}
      </vk-modal-alert>
    </div>
    <div slot="desc">
      The <code>vk-modal-alert</code> component is an alternative for the native window.alert dialog.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import { merge } from 'lodash'
import mixins from '../../mixins'
import events from './events'
import commonProps from './props'

export default {
  mixins: [mixins],
  data: function () {
    return {
      props: Helper.getProps('ModalAlert', props),
      slots,
      events
    }
  }
}

const props = merge({}, commonProps)

const slots = {
  default: {
    description: 'The main content.'
  }
}
</script>
