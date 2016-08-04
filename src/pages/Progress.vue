<template>
  <vk-docs-layout-page>
    <div class="uk-block">
      <h2>Progress</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-progress
        :progress="props.progress.demo.value"
        :color="props.color.demo.value"
        :size="props.size.demo.value"
        :stripe="props.stripe.demo.value">
        <span v-if="
          props.size.demo.value === '' && props.progress.demo.value >= 5
        ">
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
          <vk-docs-props
            :props="props"
            @change="props[arguments[0]].demo.value = arguments[1]">
          </vk-docs-props>
        </vk-tab>
        <vk-tab label="Slots">
          <vk-docs-slots :slots="slots"></vk-docs-slots>
        </vk-tab>
        <vk-tab label="Example">
          <vk-docs-code>{{ code }}</vk-docs-code>
        </vk-tab>
      </vk-tabs>
    </div>
  </vk-docs-layout-page>
</template>

<script>
import Component from '../lib/Progress'
import mixin from './_mixin'
import { mergeProps } from './helper'

export default {
  name: 'PageProgress',
  mixins: [mixin],
  data: () => ({
    props: mergeProps(Component.props, props),
    slots,
    example
  })
}

const props = {
  progress: {
    description: 'The percentage value representing the progress.',
    demo: {
      type: 'Select',
      options: [
        { text: 'default', value: 0 },
        { text: '5', value: 5 },
        { text: '40', value: 40 },
        { text: '100', value: 100 }
      ],
      value: 40
    }
  },
  color: {
    description: `The color modifier accepting as values <code>success</code>,
      <code>warning</code> or <code>danger</code>.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'default', value: '' },
        { text: 'success', value: 'success' },
        { text: 'warning', value: 'warning' },
        { text: 'danger', value: 'danger' }
      ],
      value: ''
    }
  },
  size: {
    description: `The size modifier accepting as values <code>small</code>,
      or <code>mini</code>.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'default', value: '' },
        { text: 'small', value: 'small' },
        { text: 'mini', value: 'mini' }
      ],
      value: ''
    }
  },
  stripe: {
    description: `Whether to present the progress bar as striped. If set as
      <code>animated</code> the stripe bar will be as well animated.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'default', value: '' },
        { text: 'enabled', value: 'enabled' },
        { text: 'animated', value: 'animated' }
      ],
      value: 'enabled'
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
  <span v-if="progress >= 5">
    {{ progress }}%
  </span>
</vk-pagination>`
</script>
