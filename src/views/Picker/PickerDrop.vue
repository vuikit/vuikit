<template>
  <div class="uk-block">
    <h2>Picker Drop</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button v-el:button id="picker">Pick</vk-button>
    <vk-picker-drop v-ref:demo
      :pickables="[{ name: 'id' }, 'hits']"
      :dropdown="{
        target: $els.button
      }"
      :table="{
        fields: ['name', 'hits', 'description'],
        rows: [{
          id: 1,
          name: 'Item 1',
          hits: 34,
          description: 'The item description'
        }, {
          id: 2,
          name: 'Item 2',
          hits: 56,
          description: 'The item description'
        }]
      }"
      @pick="picked">
    </vk-picker-drop>
    <span v-html="message"></span>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-picker-drop</code> component extends <code>vk-picker</code> wrapping it into a dropdown.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events" :connect="$refs.demo"></vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge } from 'lodash'
import Picker from '../../lib/Picker'
import Component from '../../lib/PickerDrop'
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    message: '',
    props: merge(props, Picker.props, Component.props),
    example,
    events
  }),
  methods: {
    picked (value, field) {
      this.message = `Picked field <code>${field}</code> which returned value <code>${value}</code>.`
    }
  }
}

const props = {
  pickables: {
    description: `Array of fields names that should allow picking data. A picked field
    can return a different field value by passing a field/data mapping <code>Object</code>
    instead. Eg. <code>[{ name: 'id' }, 'hits']</code>.`
  },
  table: {
    description: `Options passed to the underlying Table instance
      used to render the table. See the <a href="/#!/table">Table documentation</a> for more information.`
  },
  dropdown: {
    description: `Options passed to the underlying Dropdown instance
      used to render the dropdown. See the <a href="/#!/dropdown">Dropdown documentation</a> for more information.`
  }
}

const events = {
  pick: {
    description: 'Emited when a data is picked passing as argument the picked value and it field name.'
  }
}

const example =
`<vk-button v-el:button>Pick</vk-button>
<vk-picker-drop {attrs}
  :pickables="[{ name: 'id' }, 'hits']"
  :dropdown="{
    target: $els.button
  }"
  :table="{
    fields: ['name', 'hits', 'description'],
    rows: [{
      id: 1,
      name: 'Item 1',
      hits: 34,
      description: 'The item description'
    }, {
      id: 2,
      name: 'Item 2',
      hits: 56,
      description: 'The item description'
    }]
  }">
</vk-picker-drop>`
</script>
