<template>
  <vk-docs-layout-page>
    <div class="uk-block">
      <h2>Alert</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-alert
        :show="props.show.demo.value"
        :color="props.color.demo.value"
        :large="props.large.demo.value"
        :block="props.block.demo.value"
        @hide="props.show.demo.value = false">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.
      </vk-alert>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-alert</code> component renders an alert message.
      </div>
      <!-- TABS -->
      <vk-tabs>
        <vk-tab label="Props">
          <vk-docs-props :props="props"></vk-docs-props>
        </vk-tab>
        <vk-tab label="Slots">
          <vk-docs-slots :slots="slots"></vk-docs-slots>
        </vk-tab>
        <vk-tab label="Example">
          <vk-docs-code :code="code"></vk-docs-code>
        </vk-tab>
      </vk-tabs>
    </div>
  </vk-docs-layout-page>
</template>

<script>
import { merge, pick } from 'lodash'
import Component from '../lib/Alert'
import mixin from './_mixin'

export default {
  name: 'PageAlert',
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    slots,
    example
  })
}

const props = {
  show: {
    description: 'Display state that when toggled will hide/show the alert.',
    demo: {
      value: true
    }
  },
  color: {
    description: `The color modifier accepting as values <code>success</code>,
      <code>warning</code> or <code>danger</code>.`,
    demo: {
      options: ['success', 'warning', 'danger']
    }
  },
  large: {
    description: 'Whether to increase the spacing arount the text.',
    demo: {}
  },
  block: {
    description: 'Whether to allow hiding the alert by user action.',
    demo: {}
  },
  transition: {
    description: `The transition options for the alert hiding effect. Check
      <a href="https://github.com/vuikit/vuikit/blob/master/src/lib/Alert.vue#L50">the defaults</a>
      for more details.`
  }
}

const slots = {
  default: {
    description: 'The container for the message of the alert.'
  }
}

const example =
`<vk-alert {attrs}>
  Alert!
</vk-alert>`
</script>
