<template>
  <div>
    <docs-page
      :props="props"
      :events="events"
      :code="code">
      <div slot="demo">
        <vk-button
          @click="props.show.value = true">
          Open
        </vk-button>
        <vk-modal-blank v-ref:demo
          :show.sync="props.show.value"
          :block="props.block.value"
          :keyboard="props.keyboard.value"
          :center="props.center.value">
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
      </div>
      <div slot="desc">
        The <code>vk-modal-blank</code> component is a variation that resets the paddings and margins. Useful for displaying a fullscreen modal.
      </div>
    </docs-page>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'
import events from './events'
import commonProps from './props'

export default {
  mixins: [mixins],
  data: function () {
    return {
      image: require('../../assets/placeholder_600x400.svg'),
      props: Helper.getProps('ModalBlank', commonProps),
      events,
      code
    }
  }
}

const code =
`<vk-modal-blank>
  <div class="uk-grid uk-flex-middle" data-uk-grid-margin>
    <div class="uk-width-medium-1-2 uk-height-viewport uk-cover-background uk-row-first"
      style="background-image: url(...)">
    </div>
    <div class="uk-width-medium-1-2">
      <h1>Headline</h1>
      <div class="uk-width-medium-1-3">
        ...
      </div>
    </div>
  </div>
</vk-modal-blank>`
</script>
