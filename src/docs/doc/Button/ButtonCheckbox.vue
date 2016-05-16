<template>
  <div>
    <vk-button-checkbox
      :group.sync="api.group"
      :value.sync="api.value">
      <vk-button value="1">Button 1</vk-button>
      <vk-button value="2">Button 2</vk-button>
      <vk-button value="3">Button 3</vk-button>
    </vk-button-checkbox>
    <div class="uk-margin-large">
      Acting like a checkbox <code>vk-button-checkbox</code> allows toggling a
      group of <code>vk-button</code> buttons. It value will reflect an
      array of active buttons values.
    </div>
    <vk-tab-horizontal>
      <vk-tab title="Props">
        <table-api-props :rows="propsRows" :values="$data.api"></table-api-props>
      </vk-tab>
      <vk-tab title="Events">
        <table-api-events :rows="eventsRows"></table-api-events>
      </vk-tab>
      <vk-tab title="Code">
        <pre><code v-encode></code></pre>
      </vk-tab>
    </vk-tab-horizontal>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import { merge } from 'lodash'

export default {
  data: () => ({
    api: Helper.getComponentPropsDefaults('ButtonCheckbox')
  }),
  computed: {
    demoCode: () => demoCode,
    eventsRows: () => eventsInfo,
    propsRows: () => merge({},
      Helper.getComponentProps('ButtonCheckbox'),
      propsInfo
    )
  }
}

const demoCode =
`<vk-button-checkbox>
  <vk-button value="1">Button 1</vk-button>
  <vk-button value="2">Button 2</vk-button>
  <vk-button value="3">Button 3</vk-button>
</vk-button-checkbox>`

const propsInfo = {
  value: {
    description: 'The current value determined by the active button.'
  },
  group: {
    description: 'Determines whether or not the buttons are grouped.'
  }
}

const eventsInfo = [{
  name: 'change',
  description: 'Emited when there was made some selection change.'
}]
</script>
