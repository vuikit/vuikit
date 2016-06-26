<template>
  <div class="uk-block">
    <h2>Alert</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-alert
      :show.sync="props.show.demo.value"
      :color="props.color.demo.value"
      :large="props.large.demo.value"
      :block="props.block.demo.value">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.
    </vk-alert>
    <!-- DESC -->
    <div class="uk-margin-large">
      <p>The <code>vk-docs-code</code> component will copy it raw inner content,
      encode its HTML, beautify, highlight and wrapper it all in a <code>pre</code> tag.
      Provides a fast and easy way to show code examples. Currently only supports HTML.</p>
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
      </vk-tab>
      <vk-tab label="Example" active>
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import Component from '../lib/Alert'
import mixin from './_mixin'

export default {
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
    demo: {}
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
      <a href="https://github.com/vuikit/vuikit/blob/master/src/vue/Alert.vue#L43">the defaults</a>
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
