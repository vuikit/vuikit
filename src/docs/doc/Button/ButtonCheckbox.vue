<template>
  <div>
    <vk-button-checkbox v-ref:demo
      :group="props.group.value"
      :value.sync="props.value.value">
      <vk-button :value="1">Button 1</vk-button>
      <vk-button :value="2">Button 2</vk-button>
      <vk-button :value="3">Button 3</vk-button>
    </vk-button-checkbox>
    <div class="uk-margin-large">
      Acting like a checkbox <code>vk-button-checkbox</code> allows toggling a
      group of <code>vk-button</code> buttons. It value will reflect an
      array of active buttons values.
    </div>
    <vk-tab-horizontal>
      <vk-tab title="Props">
        <table-api-props :rows="props"></table-api-props>
      </vk-tab>
      <vk-tab title="Events">
        <table-api-events :rows="events"></table-api-events>
      </vk-tab>
      <vk-tab title="Code">
        <pre><code v-encode="code"></code></pre>
      </vk-tab>
    </vk-tab-horizontal>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('ButtonCheckbox', props),
    events,
    code
  })
}

const code =
`<vk-button-checkbox>
  <vk-button :value="1">Button 1</vk-button>
  <vk-button :value="2">Button 2</vk-button>
  <vk-button :value="3">Button 3</vk-button>
</vk-button-checkbox>`

const props = {
  value: {
    description: 'The current value determined by the active buttons.',
    options: [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
  },
  group: {
    description: 'Determines whether or not the buttons are grouped.'
  }
}

const events = {
  change: {
    description: 'Emited when there was made some button selection.'
  }
}
</script>
