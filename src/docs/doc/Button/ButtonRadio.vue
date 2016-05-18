<template>
  <div>
    <vk-button-radio v-ref:demo
      :group="props.group.value"
      :value.sync="props.value.value">
      <vk-button :value="1">Button 1</vk-button>
      <vk-button :value="2">Button 2</vk-button>
      <vk-button :value="3">Button 3</vk-button>
    </vk-button-radio>
    <div class="uk-margin-large">
      Acting like a radio <code>vk-button-radio</code> allows toggling between a
      group of <code>vk-button</code> buttons. It value will reflect the active
      button value.
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
    props: Helper.getProps('ButtonRadio', props),
    events,
    code
  })
}

const code =
`<vk-button-radio>
  <vk-button :value="1">Button 1</vk-button>
  <vk-button :value="2">Button 2</vk-button>
  <vk-button :value="3">Button 3</vk-button>
</vk-button-radio>`

const props = {
  value: {
    description: 'The current value determined by the active button.',
    options: [1, 2, 3]
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
