<template>
  <div class="uk-block">
    <h2>Button</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button
      :value.sync="props.value.demo.value"
      :color="props.color.demo.value"
      :size="props.size.demo.value"
      :width="props.width.demo.value"
      :icon-left="props.iconLeft.demo.value"
      :icon-right="props.iconRight.demo.value"
      :active="props.active.demo.value"
      :disabled="props.disabled.demo.value">
      Button
    </vk-button>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-button</code> component renders a standard button.
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
import Component from '../../lib/Button'
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Component.props, Object.keys(props))),
    slots,
    example
  })
}

const props = {
  value: {
    description: 'The value of the button. Usually used in combination with others components.',
    demo: {}
  },
  active: {
    description: 'Whether to present the button as active.',
    demo: {}
  },
  disabled: {
    description: 'Whether to present the button as disabled.',
    demo: {}
  },
  color: {
    description: `The color modifier accepting as values <code>primary</code>, <code>success</code>,
      <code>danger</code> or <code>link</code>.`,
    demo: {
      options: ['primary', 'success', 'danger', 'link']
    }
  },
  size: {
    description: `The size modifier accepting as values <code>mini</code>, <code>small</code>,
      or <code>large</code>.`,
    demo: {
      options: ['mini', 'small', 'large']
    }
  },
  width: {
    description: `The width of the button. Can be any class from the
      <a href="http://getuikit.com/docs/grid.html">UIkit Grid</a>
      without the <code>uk-width-</code> prefix.`,
    demo: {
      options: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-10']
    }
  },
  iconLeft: {
    description: `The left icon of the button. Can be any icon of
      <a href="http://getuikit.com/docs/icon.html">UIkit icons</a>
      without the <code>uk-icon-</code> prefix.`,
    demo: {
      options: ['flag', 'microphone', 'gamepad']
    }
  },
  iconRight: {
    description: `The right icon of the button. Can be any icon of
      <a href="http://getuikit.com/docs/icon.html">UIkit Icons</a>
      without the <code>uk-icon-</code> prefix.`,
    demo: {
      options: ['flag', 'microphone', 'gamepad']
    }
  }
}

const slots = {
  default: {
    description: 'The button inner text.'
  }
}

const example =
`<vk-button {attrs}>
  Button
</vk-button>`
</script>
