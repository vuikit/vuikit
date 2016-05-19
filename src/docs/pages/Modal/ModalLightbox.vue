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
        A variation if you want to use the modal as a lightbox for your images.
      </div>
    </docs-page>
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
        Helper.getProps('ModalLightbox', this.$parent.$options.mainPropsInfo),
        props
      ),
      events: this.$parent.$options.mainEventsInfo,
      code
    }
  }
}

const code =
`<vk-modal-lightbox>
  <img />
</vk-modal-lightbox>`

const props = {
  bgClose: {
    description: 'Determines whether or not the modal can be closed by clicking the background.'
  },
  hideClose: {
    description: 'Determines whether or not the close button is displayed.'
  }
}
</script>
