<template>
  <div class="uk-block">
    <h2>Button</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-button
      :type="props.type.demo.value"
      :aria-type="props.ariaType.demo.value"
      :value="props.value.demo.value"
      :disabled="props.disabled.demo.value"
      :active="props.active.demo.value"
      :color="props.color.demo.value"
      :size="props.size.demo.value"
      :width="props.width.demo.value"
      @click.native="props.active.demo.value = !props.active.demo.value">
      Button
    </vk-button>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-button</code> component renders a UIkit Button.
    </div>
    <!-- TABS -->
    <vk-tabs
      :index="tabsIndex"
      @change="tabsIndex = arguments[0]">
      <vk-tabs-item name="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </vk-tabs-item>
      <vk-tabs-item name="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
      </vk-tabs-item>
      <vk-tabs-item name="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tabs-item>
    </vk-tabs>
  </div>
</template>

<script>
import Component from '../../lib/Button'
import mixin from '../_mixin'
import { mergeProps } from '../../helpers/pages'

export default {
  name: 'PageButtonDefault',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    props: mergeProps(Component.props, props),
    slots,
    example
  })
}

const props = {
  value: {
    description: 'The value of the button usually used in combination with others components.',
    demo: {
      type: 'Overview'
    }
  },
  type: {
    description: 'The HTML button type.',
    demo: {
      type: 'Select',
      options: [
        { text: 'button', value: 'button' },
        { text: 'submit', value: 'submit' },
        { text: 'reset', value: 'reset' }
      ],
      value: 'button'
    }
  },
  ariaType: {
    description: 'The HTML ARIA type.',
    demo: {
      type: 'Select',
      options: [
        { text: 'pressed', value: 'pressed' },
        { text: 'checked', value: 'checked' }
      ],
      value: 'pressed'
    }
  },
  active: {
    description: 'The initial state of the <code>active</code> local state.',
    demo: {
      type: 'Boolean',
      value: false
    }
  },
  disabled: {
    description: 'Whether to present the button as disabled.',
    demo: {
      type: 'Boolean',
      value: false
    }
  },
  color: {
    description: `The color modifier accepting as values <code>primary</code>, <code>success</code>,
      <code>danger</code> or <code>link</code>.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'default', value: '' },
        { text: 'primary', value: 'primary' },
        { text: 'success', value: 'success' },
        { text: 'danger', value: 'danger' },
        { text: 'link', value: 'link' }
      ],
      value: ''
    }
  },
  size: {
    description: `The size modifier accepting as values <code>mini</code>, <code>small</code>,
      or <code>large</code>.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'default', value: '' },
        { text: 'mini', value: 'mini' },
        { text: 'small', value: 'small' },
        { text: 'large', value: 'large' }
      ],
      value: ''
    }
  },
  width: {
    description: `The width of the button. Can be any class from the
      <a href="http://getuikit.com/docs/grid.html">UIkit Grid</a>
      without the <code>uk-width-</code> prefix.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'default', value: '' },
        { text: '1-1', value: '1-1' },
        { text: '1-2', value: '1-2' },
        { text: '1-3', value: '1-3' },
        { text: '1-4', value: '1-4' },
        { text: '1-5', value: '1-5' },
        { text: '1-6', value: '1-6' },
        { text: '1-10', value: '1-10' }
      ],
      value: ''
    }
  }
}

const slots = {
  default: {
    description: 'The button inner text.'
  }
}

const example =
`<vk-button :active="active" {attrs}
  @click.native="active = !active">
  Button
</vk-button>`
</script>
