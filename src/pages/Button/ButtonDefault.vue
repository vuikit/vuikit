<template>
  <div class="uk-block">
    <h2>Button</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button ref="button"
      :type="props.type.demo.value"
      :aria-type="props.ariaType.demo.value"
      :value="props.value.demo.value"
      :disabled="props.disabled.demo.value"
      :active="props.active.demo.value"
      :color="props.color.demo.value"
      :size="props.size.demo.value"
      :width="props.width.demo.value"
      :icon="props.icon.demo.value"
      @click.native="props.active.demo.value = !$refs.button.active">
      Button
    </vk-button>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-button</code> component renders a standard button.
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
  name: 'PageButtonDefault',
  mixins: [mixin],
  data: () => ({
    props: merge({}, pick(Component.props, Object.keys(props)), props),
    slots,
    example
  })
}

const props = {
  value: {
    description: 'The value of the button usually used in combination with others components.',
    demo: {}
  },
  type: {
    description: 'The HTML button type.',
    demo: {
      options: ['submit', 'reset']
    }
  },
  ariaType: {
    description: 'The HTML ARIA type.',
    demo: {
      options: ['checked']
    }
  },
  active: {
    description: 'The initial state of the <code>active</code> local state.',
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
  icon: {
    description: `An icon placed on the right. Can be any icon of
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
`<vk-button ref="button" {attrs}>
  Button
  @click.native="
    active = !$refs.button.active
  ">
</vk-button>`
</script>
