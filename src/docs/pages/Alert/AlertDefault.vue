<template>
  <docs-page
    component="alert"
    code-slot="Alert!"
    :props="props"
    :slots="slots">
    <div slot="demo">
      <vk-alert v-ref:demo
        :show.sync="props.show.value"
        :color="props.color.value"
        :large="props.large.value"
        :block="props.block.value">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.
      </vk-alert>
    </div>
    <div slot="desc">
      The <code>vk-alert</code> component renders an alert message.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Alert', props),
    slots
  })
}

const props = {
  show: {
    description: 'Display state that when toggled will hide/show the alert.'
  },
  color: {
    description: `The color modifier accepting as values <code>success</code>,
      <code>warning</code> or <code>danger</code>.`,
    options: ['success', 'warning', 'danger']
  },
  large: {
    description: 'Whether to increase the spacing arount the text.'
  },
  block: {
    description: 'Whether to allow hiding the alert by user action.'
  },
  transition: {
    description: `The transition options for the alert hiding effect. Check
      <a href="https://github.com/JOOlanders/vuikit/blob/master/src/vue/Alert.vue#L43">the defaults</a>
      for more details.`,
    demo: false
  }
}

const slots = {
  default: {
    description: 'The container for the message of the alert.'
  }
}
</script>
