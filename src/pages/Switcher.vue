<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Switcher</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-switcher
        :index="props.index.demo.value"
        :transition="props.transition.demo.value"
        :transitionMode="props.transitionMode.demo.value">
        <vk-switcher-item>Change the <code>index</code> prop value to switch me.</vk-switcher-item>
        <vk-switcher-item>You did it!</vk-switcher-item>
        <vk-switcher-item>There is no limit in the amount of items.</vk-switcher-item>
      </vk-switcher>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-switcher</code> component together with <code>vk-switch</code> allows transitioning through different content panes.
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
        <vk-tabs-item name="Events">
          <vk-docs-events :events="events"></vk-docs-events>
        </vk-tabs-item>
        <vk-tabs-item name="Example">
          <vk-docs-code>{{ code }}</vk-docs-code>
        </vk-tabs-item>
      </vk-tabs>
    </div>
  </layouts-default>
</template>

<script>
import Component from '../lib/Switcher'
import mixin from './_mixin'
import { mergeProps } from '../helpers/pages'

export default {
  name: 'PageSwitcher',
  mixins: [mixin],
  data: () => ({
    tabsIndex: 0,
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  })
}

const props = {
  index: {
    description: 'The currently active item referenced by its order index.',
    demo: {
      type: 'Select',
      options: [
        { text: '0', value: 0 },
        { text: '1', value: 1 },
        { text: '2', value: 2 }
      ],
      value: 0
    }
  },
  transition: {
    description: 'The transition name to be used for the switch animation.',
    demo: {
      type: 'Select',
      options: [],
      value: ''
    }
  },
  transitionMode: {
    description: 'The transition mode to be used for the switch animation',
    demo: {
      type: 'Select',
      options: [
        { text: 'out-in', value: 'out-in' },
        { text: 'in-out', value: 'in-out' }
      ],
      value: 'out-in'
    }
  }
}

const slots = {
  default: {
    description: 'The list of <code>li</code> elements holding the content to be switched.'
  }
}

const events = {
  change: {
    description: 'Emited when the selected item changes.'
  }
}

const example =
`<vk-switcher :index="index" {attrs}>
  <vk-switcher-item><vk-button>Hola</vk-button>Change the active index in the prop demo.</vk-switcher-item>
  <vk-switcher-item>You did it!</vk-switcher-item>
  <vk-switcher-item>There is no limit in the amount of items.</vk-switcher-item>
</vk-switcher>`
</script>
