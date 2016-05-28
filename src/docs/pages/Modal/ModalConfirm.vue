<template>
  <div>
    <docs-page
      :props="props"
      :events="events"
      :code="code">
      <div slot="demo">
        <vk-button
          @click="(props.show.value = true) && ($refs.demo.state = false)"
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
      </div>
      <div slot="desc">
        An alternative for the native window.confirm dialog.
      </div>
    </docs-page>
  </div>
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
      events,
      code
    }
  }
}

const code =
'<vk-modal-confirm text="Text"></vk-modal-confirm>'

const props = merge({}, commonProps, {
  text: {
    description: `The text for the modal content. For HTML use the
      <code>default</code> slot instead.`,
    editable: false
  }
})

const events = merge({}, commonEvents, {
  confirm: {
    description: 'Emited on user confirmation'
  }
})
</script>
