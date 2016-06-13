<template>
  <docs-page
    component="progress"
    :code-slot="codeSlot"
    :props="props"
    :slots="slots">
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
      The <code>vk-progress</code> component renders a progress bar.
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Progress', props),
    slots,
    codeSlot
  })
}

const codeSlot = '{{ progress }}%'

const props = {
  progress: {
    description: 'The percentage value representing the progress.',
    options: [5, 40, 100],
    value: 40
  },
  color: {
    description: `The color modifier accepting as values <code>success</code>,
      <code>warning</code> or <code>danger</code>.`,
    options: ['success', 'warning', 'danger']
  },
  size: {
    description: `The size modifier accepting as values <code>small</code>,
      or <code>mini</code>.`,
    options: ['small', 'mini']
  },
  stripe: {
    description: `Whether to present the progress bar as striped. If set as
      <code>animated</code> the stripe bar will be as well animated.`,
    options: {'enabled': true, 'animated': 'animated'}
  }
}

const slots = {
  default: {
    description: 'The progress bar content.'
  }
}
</script>
