<template>
  <div class="uk-block">
    <h2>Button Checkbox</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button-checkbox v-ref:demo
      :group="props.group.demo.value"
      :value.sync="props.value.demo.value">
      <vk-button value="1">Button 1</vk-button>
      <vk-button value="2">Button 2</vk-button>
      <vk-button value="3">Button 3</vk-button>
    </vk-button-checkbox>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-button-checkbox</code> component, acting like a checkbox form field, allows toggling a group of <code>vk-button</code> buttons.
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
import Component from '../../lib/ButtonCheckbox'
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
    description: 'Array reflecting the values of the currently active buttons.',
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
    description: 'Emited on button selection.'
  }
}

const example =
`<vk-button-checkbox {attrs}>
  <vk-button value="1">Button 1</vk-button>
  <vk-button value="2">Button 2</vk-button>
  <vk-button value="3">Button 3</vk-button>
</vk-button-checkbox>`
</script>
