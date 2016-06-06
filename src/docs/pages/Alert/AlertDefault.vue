<template>
  <docs-page
    :props="props"
    :slots="slots"
    :code="code">
    <div slot="demo">
      <vk-alert v-ref:demo
        :show.sync="props.show.value"
        :color="props.color.value"
        :size="props.size.value"
        :close="props.close.value">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.
      </vk-alert>
    </div>
    <div slot="desc">
      The <code>vk-alert</code> component renders success, warning and error messages.
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
    slots,
    code
  })
}

const code = '<vk-alert></vk-alert>'

const props = {
  show: {
    description: 'Determines whether or not the alert is displayed.'
  },
  color: {
    description: 'Determines the color of the alert. Leave empty for default.',
    options: ['default', 'success', 'warning', 'danger']
  },
  size: {
    description: 'Determines the size of the alert. Leave empty for default.',
    options: ['default', 'large']
  },
  close: {
    description: 'Determines whether or not the close button is displayed.'
  },
  transition: {
    description: `Determines the transition options data object:
      </br><code>fade</code> - whether or not the alert will fade on close,
      </br><code>duration</code> - the time in ms for alert fade animation on close.`,
    default: {},
    value: '',
    editable: false
  }
}

const slots = {
  default: {
    description: 'The default slot holds the alert message content.'
  }
}
</script>
