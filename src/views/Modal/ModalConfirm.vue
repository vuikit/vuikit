<template>
  <div class="uk-block">
    <h2>Modal Confirm</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button
      @click="(props.show.demo.value = true) && ($refs.demo.state = false)">
      {{ buttonText }}
    </vk-button>
    <vk-modal-confirm v-ref:demo
      :show.sync="props.show.demo.value"
      :center="props.center.demo.value"
      :block="props.block.demo.value"
      :keyboard="props.keyboard.demo.value"
      @confirm="buttonText = 'Confirmed'"
      @dismiss="buttonText = 'Dismissed'">
      {{ props.block.demo.value
        ? 'The modal is blocked, refresh the page to continue.'
        : 'Are you sure?' }}
    </vk-modal-confirm>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-modal-confirm</code> component is an alternative for the native window.confirm dialog.
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
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import commonEvents from './events'
import commonProps from './props'
import ModalBase from '../../lib/ModalBase'
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data () {
    return {
      buttonText: 'Open',
      props: merge({}, commonProps, pick(ModalBase.props, Object.keys(commonProps))),
      slots,
      events,
      example
    }
  }
}

const events = merge({}, commonEvents, {
  confirm: {
    description: 'Emited on user confirmation.'
  }
})

const slots = {
  default: {
    description: 'The main content.'
  }
}

const example =
`<vk-modal-confirm {attrs}>
  Are you sure?
</vk-modal-confirm>`
</script>
