<template>
  <div>
    <docs-page
      :props="props"
      :slots="slots"
      :code="code">
      <div slot="demo">
        <vk-progress v-ref:demo
          :progress="props.progress.value"
          :color="props.color.value"
          :size="props.size.value"
          :stripe="props.stripe.value">
          <span v-if="props.size.value === ''">
            {{ props.progress.value }}%
          </span>
        </vk-progress>
      </div>
      <div slot="desc">
        Renders a progress bar with different styles.
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
    props: Helper.getProps('Progress', props),
    slots,
    code
  })
}

const code = '<vk-progress></vk-progress>'

const props = {
  progress: {
    description: 'Determines the bar progress, from <code>0</code> to <code>100</code>.',
    options: [1, 5, 40, 50, 100],
    value: 40
  },
  color: {
    description: `Determines the bar color, <code>success</code>, <code>warning</code>
      or <code>danger</code>. Leave empty for default.`,
    options: ['default', 'success', 'warning', 'danger']
  },
  size: {
    description: `Determines the bar size, <code>small</code> or <code>mini</code>.
      Leave empty for default.`,
    options: ['default', 'small', 'mini']
  },
  stripe: {
    description: `Determines whether or not the progress bar is striped. Set as
      <code>animated</code> for animating the stripe.`,
    options: {'default': false, 'enabled': true, 'animated': 'animated'}
  }
}

const slots = {
  default: {
    description: 'The optional default slot holds the progress bar text content.'
  }
}
</script>
