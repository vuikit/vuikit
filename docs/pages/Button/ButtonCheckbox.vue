<template>
  <docs-page
    component="button-checkbox"
    :code-slot="codeSlot"
    :props="props"
    :events="events">
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
      The <code>vk-button-checkbox</code> component, acting like a checkbox form field, allows toggling a group of <code>vk-button</code> buttons.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('ButtonCheckbox', props),
    events,
    codeSlot
  })
}

const codeSlot =
`<vk-button value="1">Button 1</vk-button>
<vk-button value="2">Button 2</vk-button>
<vk-button value="3">Button 3</vk-button>`

const props = {
  value: {
    description: 'Array reflecting the values of the currently active buttons.'
  },
  group: {
    description: 'Whether to display the buttons grouped together.'
  }
}

const events = {
  change: {
    description: 'Emited on button selection.'
  }
}
</script>
