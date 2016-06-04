<template>
  <div>
    <docs-page
      :props="props"
      :events="events"
      :code="code">
      <div slot="demo">
        <vk-button-checkbox v-ref:demo
          :group="props.group.value"
          :value.sync="props.value.value">
          <vk-button value="1">Button 1</vk-button>
          <vk-button value="2">Button 2</vk-button>
          <vk-button value="3">Button 3</vk-button>
        </vk-button-checkbox>
      </div>
      <div slot="desc">
        The <code>vk-button-checkbox</code> component, acting like a checkbox form field, allows toggling a group of <code>vk-button</code> buttons. It value will reflect an array of the active buttons values.
      </div>
    </docs-page>
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
  <vk-button value="1">Button 1</vk-button>
  <vk-button value="2">Button 2</vk-button>
  <vk-button value="3">Button 3</vk-button>
</vk-button-checkbox>`

const props = {
  value: {
    description: 'The current value determined by the active buttons.',
    value: []
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
