<template>
  <div class="uk-block">
    <h2>Progress</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-progress v-ref:demo
      :progress="props.progress.demo.value"
      :color="props.color.demo.value"
      :size="props.size.demo.value"
      :stripe="props.stripe.demo.value">
      <span v-if="props.size.demo.value === ''">
        {{ props.progress.demo.value }}%
      </span>
    </vk-progress>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-progress</code> component renders a progress bar.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <vk-docs-props :props="props"></vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import Component from '../lib/Progress'
import mixin from './_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    slots,
    example
  })
}

const props = {
  progress: {
    description: 'The percentage value representing the progress.',
    demo: {
      options: [5, 40, 100],
      value: 40
    }
  },
  color: {
    description: `The color modifier accepting as values <code>success</code>,
      <code>warning</code> or <code>danger</code>.`,
    demo: {
      options: ['success', 'warning', 'danger']
    }
  },
  size: {
    description: `The size modifier accepting as values <code>small</code>,
      or <code>mini</code>.`,
    demo: {
      options: ['small', 'mini']
    }
  },
  stripe: {
    description: `Whether to present the progress bar as striped. If set as
      <code>animated</code> the stripe bar will be as well animated.`,
    demo: {
      options: {'enabled': true, 'animated': 'animated'}
    }
  }
}

const slots = {
  default: {
    description: 'The progress bar content.'
  }
}

const example =
`<vk-pagination {attrs}>
  40%
</vk-pagination>`
</script>
