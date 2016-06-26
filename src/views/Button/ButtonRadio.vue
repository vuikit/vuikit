<template>
  <div class="uk-block">
    <h2>Button Radio</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button-radio v-ref:demo
      :group="props.group.demo.value"
      :value.sync="props.value.demo.value">
      <vk-button value="1">Button 1</vk-button>
      <vk-button value="2">Button 2</vk-button>
      <vk-button value="3">Button 3</vk-button>
    </vk-button-radio>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-button-radio</code> component, acting like a radio form field, allows toggling between a group of <code>vk-button</code> buttons.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
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
import Component from '../../lib/ButtonRadio'
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    slots,
    events,
    example
  })
}

const props = {
  value: {
    description: 'Value reflecting the value of the currently active button.',
    demo: {}
  },
  group: {
    description: 'Whether to display the buttons grouped together.',
    demo: {}
  }
}

const slots = {
  default: {
    description: 'The list of <code>vk-button</code> components.'
  }
}

const events = {
  change: {
    description: 'Emited when there was made some button selection.'
  }
}

const example =
`<vk-button-radio {attrs}>
  <vk-button value="1">Button 1</vk-button>
  <vk-button value="2">Button 2</vk-button>
  <vk-button value="3">Button 3</vk-button>
</vk-button-radio>`
</script>
