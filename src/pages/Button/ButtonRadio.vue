<template>
  <div class="uk-block">
    <h2>Button Radio</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button-radio
      :group="props.group.demo.value"
      :value="props.value.demo.value"
      @change="
        events.change.emited = true,
        props.value.demo.value = arguments[0]
      ">
      <vk-button :value="1">Button 1</vk-button>
      <vk-button :value="2">Button 2</vk-button>
      <vk-button :value="3">Button 3</vk-button>
    </vk-button-radio>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-button-radio</code> component, acting like a radio form field, allows toggling between a group of <code>vk-button</code> buttons.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events"></vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Component from '../../lib/ButtonRadio'
import mixin from '../_mixin'
import { mergeProps } from '../helper'

export default {
  name: 'PageButtonRadio',
  mixins: [mixin],
  data: () => ({
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  })
}

const props = {
  value: {
    description: 'The current value reflecting the selected button one.',
    demo: {
      type: 'Select',
      options: [
        { text: 'default', value: null },
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 }
      ],
      value: ''
    }
  },
  group: {
    description: 'Whether to display the buttons grouped together.',
    demo: {
      value: true
    }
  }
}

const slots = {
  default: {
    description: 'The list of <code>vk-button</code> components.'
  }
}

const events = {
  change: {
    description: 'Emited when there was made some button selection.',
    emited: false
  }
}

const example =
`<vk-button-radio {attrs}
  @change="value = arguments[0]">
  <vk-button :value="1">Button 1</vk-button>
  <vk-button :value="2">Button 2</vk-button>
  <vk-button :value="3">Button 3</vk-button>
</vk-button-radio>`
</script>
