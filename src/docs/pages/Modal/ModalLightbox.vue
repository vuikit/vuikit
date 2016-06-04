<template>
  <div>
    <docs-page
      :props="props"
      :slots="slots"
      :events="events"
      :code="code">
      <div slot="demo">
        <vk-button
          @click="props.show.value = true"
          text="Open">
        </vk-button>
        <vk-modal-lightbox v-ref:demo
          :show.sync="props.show.value"
          :block="props.block.value"
          :keyboard="props.keyboard.value"
          :center="props.center.value"
          :bg-close="props.bgClose.value"
          :hide-close="props.hideClose.value">
          <img src="../../assets/placeholder_600x400.svg">
        </vk-modal-lightbox>
      </div>
      <div slot="desc">
        The <code>vk-modal-lightbox</code> component is a variation suited for displaying images.
      </div>
    </docs-page>
  </div>
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
      events,
      code
    }
  }
}

const code =
`<vk-modal-lightbox>
  <img />
</vk-modal-lightbox>`

const props = merge({}, commonProps, {
  bgClose: {
    description: `Determines whether or not the modal can be closed by clicking
      the background.`
  },
  hideClose: {
    description: 'Determines whether or not the close button is displayed.'
  }
})

const slots = {
  default: {
    description: 'Holds the modal default content, usually an image.'
  }
}
</script>
