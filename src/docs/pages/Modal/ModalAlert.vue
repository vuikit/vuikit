<template>
  <div>
    <docs-page
      :props="props"
      :events="events"
      :code="code">
      <div slot="demo">
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
      </div>
      <div slot="desc">
        An alternative for the native window.alert dialog.
      </div>
    </docs-page>
  </div>
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
      events,
      code
    }
  }
}

const code = '<vk-modal-alert text="Text"></vk-modal-alert>'

const props = merge({}, commonProps, {
  text: {
    description: `The text for the modal content. For HTML use the
      <code>default</code> slot instead.`,
    editable: false
  }
})
</script>
