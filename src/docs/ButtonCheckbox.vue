<template>
  <layouts-default>
    <h1>Button Checkbox</h1>
    Display a checkbox like buttons composition.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <!-- DEMO -->
      <vk-button-checkbox
        :group="props.group.demo.value"
        :value="props.value.demo.value"
        @change="value => {
          events.change.emited = true
          props.value.demo.value = value
        }">
        <vk-button :value="1">Button 1</vk-button>
        <vk-button :value="2">Button 2</vk-button>
        <vk-button :value="3">Button 3</vk-button>
      </vk-button-checkbox>
    </div>
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="(prop, value) => props[prop].demo.value = value">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots" />
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events" />
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </layouts-default>
</template>

<script>
import Component from 'lib/ButtonCheckbox'
import mixin from './_mixin'
import { mergeProps } from 'helpers/pages'

export default {
  name: 'PageButtonCheckbox',
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
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
        { text: 'default', value: [] },
        { text: '[1]', value: [1] },
        { text: '[2]', value: [2] },
        { text: '[3]', value: [3] },
        { text: '[1, 2]', value: [1, 2] },
        { text: '[1, 3]', value: [1, 3] },
        { text: '[2, 3]', value: [2, 3] },
        { text: '[1, 2, 3]', value: [1, 2, 3] }
      ],
      value: []
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
    description: `Emited on the intention to change the selection passing as argument the
      resulting value.`,
    emited: false
  }
}

const example =
`<vk-button-checkbox @change="newValue => { value = newValue }">
  <vk-button :value="1">Button 1</vk-button>
  <vk-button :value="2">Button 2</vk-button>
  <vk-button :value="3">Button 3</vk-button>
</vk-button-checkbox>`
</script>
