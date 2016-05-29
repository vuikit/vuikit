<template>
  <div>
    <docs-page
      :props="props"
      :code="code">
      <div slot="demo">
        <vk-alert v-ref:demo
          :show.sync="props.show.value"
          :style="props.style.value"
          :size="props.size.value"
          :close="props.close.value">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.
        </vk-alert>
      </div>
      <div slot="desc">
        Display success, warning or error messages with <code>vk-alert</code> component. It's possible to adjust
        the message size, color and display a close button.
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
    props: Helper.getProps('Alert', props),
    code
  })
}

const code = '<vk-alert></vk-alert>'

const props = {
  show: {
    description: 'Determines whether to show alert.'
  },
  style: {
    description: 'Determines the color of alert.',
    options: ['default', 'success', 'warning', 'danger']
  },
  size: {
    description: 'Determines the size of alert.',
    options: ['default', 'large']
  },
  close: {
    description: 'Determines whether or not the close button is displayed.'
  },
  transition: {
    description: `Determines the transition options data object:
      </br><code>fade</code> - whether or not the alert will fade on close,
      </br><code>duration</code> - the time in ms for alert fade animation on close.`,
    default: {}
  }
}
</script>
