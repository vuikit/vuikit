<template>
  <docs-page
    component="button-radio"
    :code-slot="codeSlot"
    :props="props"
    :events="events">
    <div slot="demo">
      <vk-button-radio v-ref:demo
        :group="props.group.value"
        :value.sync="props.value.value">
        <vk-button value="1">Button 1</vk-button>
        <vk-button value="2">Button 2</vk-button>
        <vk-button value="3">Button 3</vk-button>
      </vk-button-radio>
    </div>
    <div slot="desc">
      The <code>vk-button-radio</code> component, acting like a radio form field, allows toggling between a group of <code>vk-button</code> buttons.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('ButtonRadio', props),
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
    description: 'Value reflecting the value of the currently active button.'
  },
  group: {
    description: 'Whether to display the buttons grouped together.'
  }
}

const events = {
  change: {
    description: 'Emited when there was made some button selection.'
  }
}
</script>
