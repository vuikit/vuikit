<template>
  <layouts-default>
    <h1>Button</h1>
    Display a simple button.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <!-- DEMO -->
      <vk-button
        :value="props.value.demo.value"
        :color="props.color.demo.value"
        :disabled="props.disabled.demo.value"
        :active="props.active.demo.value"
        :size="props.size.demo.value"
        :width="props.width.demo.value"
        @click="props.active.demo.value = !props.active.demo.value">
        Button
      </vk-button>
    </div>
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="(prop, value) => props[prop].demo.value = value">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-docs-slots :slots="slots" />
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </layouts-default>
</template>

<script>
import Component from 'lib/Button'
import mixin from './_mixin'
import { mergeProps } from 'helpers/pages'

export default {
  name: 'PageButtonDefault',
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
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
    description: 'The button native type.'
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
    description: `The button style modifier, <code>primary</code>, <code>success</code>,
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
    description: 'The button inner content.'
  }
}

const example =
`<vk-button>Button</vk-button>`
</script>
