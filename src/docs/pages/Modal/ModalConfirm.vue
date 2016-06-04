<template>
  <docs-page
    :props="props"
    :slots="slots"
    :events="events"
    :code="code">
    <div slot="demo">
      <vk-button
        @click="(props.show.value = true) && ($refs.demo.state = false)">
        {{ buttonText }}
      </vk-button>
      <vk-modal-confirm v-ref:demo
        :show.sync="props.show.value"
        :center="props.center.value"
        :block="props.block.value"
        :keyboard="props.keyboard.value"
        @confirm="buttonText = 'Confirmed'"
        @dismiss="buttonText = 'Dismissed'">
        {{ props.block.value
          ? 'The modal is blocked, refresh the page to continue.'
          : 'Are you sure?' }}
      </vk-modal-confirm>
    </div>
    <div slot="desc">
      The <code>vk-modal-confirm</code> component is an alternative for the native window.confirm dialog.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'
import { merge } from 'lodash'
import commonEvents from './events'
import commonProps from './props'

export default {
  mixins: [mixins],
  data: function () {
    return {
      buttonText: 'Open',
      props: Helper.getProps('ModalConfirm', props),
      slots,
      events,
      code
    }
  }
}

const code =
'<vk-modal-confirm></vk-modal-confirm>'

const props = merge({}, commonProps)

const events = merge({}, commonEvents, {
  confirm: {
    description: 'Emited on user confirmation'
  }
})

const slots = {
  default: {
    description: 'The default slot holds the modal text content.'
  }
}
</script>
