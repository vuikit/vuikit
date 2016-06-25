<template>
  <div class="uk-block">
    <h2>ModalLightbox</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button
      @click="props.show.demo.value = true">
      Open
    </vk-button>
    <vk-modal-lightbox v-ref:demo
      :show.sync="props.show.demo.value"
      :block="props.block.demo.value"
      :keyboard="props.keyboard.demo.value"
      :center="props.center.demo.value"
      :bg-close="props.bgClose.demo.value"
      :close-btn="props.closeBtn.demo.value">
      <img src="../assets/placeholder_600x400.svg">
    </vk-modal-lightbox>
    </div>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-modal-lightbox</code> component is a variation suited for displaying images.
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
<vk-modal-lightbox>
  // img
</vk-modal-lightbox>
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
import Component from '../../lib/ModalLightbox'

export default {
  data () {
    return {
      props: merge(
        props,
        pick(ModalBase.props, Object.keys(props)),
        pick(Component.props, Object.keys(props))
      ),
      slots,
      events
    }
  }
}

const props = merge({}, commonProps, {
  bgClose: {
    description: 'Whether to allow closing the modal by clicking on the background.',
    demo: {}
  },
  closeBtn: {
    description: 'Whether to display the modal close button.',
    demo: {}
  }
})

const slots = {
  default: {
    description: 'The default content, usually an image.'
  }
}
</script>
