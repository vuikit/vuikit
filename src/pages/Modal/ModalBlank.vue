<template>
  <div class="uk-block">
    <h2>Modal Blank</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button
      @click="props.show.demo.value = true">
      Open
    </vk-button>
    <vk-modal-blank v-ref:demo
      :show.sync="props.show.demo.value"
      :block="props.block.demo.value"
      :keyboard="props.keyboard.demo.value"
      :center="props.center.demo.value">
      <div class="uk-grid uk-flex-middle" data-uk-grid-margin>
        <div class="uk-width-medium-1-2 uk-height-viewport uk-cover-background uk-row-first"
          :style="{'background-image': 'url(' + image + ')'}">
        </div>
        <div class="uk-width-medium-1-2">
          <h1>Headline</h1>
          <div class="uk-width-medium-1-3">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </vk-modal-blank>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-modal-blank</code> component is a variation that resets the paddings and margins. Useful for displaying a fullscreen modal.
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
import events from './events'
import commonProps from './props'
import ModalBase from '../../lib/ModalBase'
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data () {
    return {
      image: require('../assets/placeholder_600x400.svg'),
      props: merge({}, commonProps, pick(ModalBase.props, Object.keys(commonProps))),
      slots,
      events,
      example
    }
  }
}

const slots = {
  default: {
    description: 'The main content.'
  }
}

const example =
`<vk-modal-blank {attrs}>
  <div class="uk-grid uk-flex-middle" data-uk-grid-margin>
    <div class="uk-width-medium-1-2 uk-height-viewport uk-cover-background uk-row-first" style="background-image: url(...)"></div>
    <div class="uk-width-medium-1-2">
      <h1>Headline</h1>
      <div class="uk-width-medium-1-3">
        <p>Content</p>
      </div>
    </div>
  </div>
</vk-modal-blank>`
</script>
