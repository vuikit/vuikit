<template>
  <layouts-default>
    <h1>Button Radio</h1>
    Display a radio like buttons composition.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <vk-button-radio
        :group="props.group.demo.value"
        :value="props.value.demo.value"
        @change="value => {
          events.change.emited = true
          props.value.demo.value = value
        }">
        <vk-button :value="1">Button 1</vk-button>
        <vk-button :value="2">Button 2</vk-button>
        <vk-button :value="3">Button 3</vk-button>
      </vk-button-radio>
    </div>
    <vk-tabs
      :index="tabsIndex"
      @change="index => { tabsIndex = index }">
      <vk-tabs-item name="Props">
        <vk-docs-props
          :props="props"
          @change="(prop, value) => props[prop].demo.value = value">
        </vk-docs-props>
      </vk-tabs-item>
      <vk-tabs-item name="Slots">
        <vk-docs-slots :slots="slots" />
      </vk-tabs-item>
      <vk-tabs-item name="Events">
        <vk-docs-events :events="events" />
      </vk-tabs-item>
      <vk-tabs-item name="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tabs-item>
    </vk-tabs>
  </layouts-default>
</template>

<script>
import Component from '../lib/ButtonRadio'
import mixin from './_mixin'
import { mergeProps } from '../helpers/pages'

export default {
  name: 'PageButtonRadio',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
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
    description: `Emited on the intention to change the selection passing as argument the
      resulting value.`,
    emited: false
  }
}

const example =
`<vk-button-radio @change="newValue => { value = newValue }">
  <vk-button :value="1">Button 1</vk-button>
  <vk-button :value="2">Button 2</vk-button>
  <vk-button :value="3">Button 3</vk-button>
</vk-button-radio>`
</script>
