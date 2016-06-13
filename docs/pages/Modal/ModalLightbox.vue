<template>
  <docs-page
    component="modal-lightbox"
    :props="props"
    :slots="slots"
    :events="events">
    <div slot="demo">
      <vk-button
        @click="props.show.value = true">
        Open
      </vk-button>
      <vk-modal-lightbox v-ref:demo
        :show.sync="props.show.value"
        :block="props.block.value"
        :keyboard="props.keyboard.value"
        :center="props.center.value"
        :bg-close="props.bgClose.value"
        :close-btn="props.closeBtn.value">
        <img src="../../assets/placeholder_600x400.svg">
      </vk-modal-lightbox>
    </div>
    <div slot="desc">
      The <code>vk-modal-lightbox</code> component is a variation suited for displaying images.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'
import { merge } from 'lodash'
import events from './events'
import commonProps from './props'

export default {
  mixins: [mixins],
  data: function () {
    return {
      props: Helper.getProps('ModalLightbox', props),
      slots,
      events
    }
  }
}

const props = merge({}, commonProps, {
  bgClose: {
    description: 'Whether to allow closing the modal by clicking on the background.'
  },
  closeBtn: {
    description: 'Whether to display the modal close button.'
  }
})

const slots = {
  default: {
    description: 'The default content, usually an image.'
  }
}
</script>
