<template>
  <layouts-default>
    <h1>Tooltip</h1>
    Display prompt information on mouse hover.
    <hr class="uk-article-divider">
    <div class="uk-margin">
      <!-- DEMO -->
      <vk-button>
        Hover me
        <vk-tooltip
          content="Tooltip 1"
          :placement="props.placement.demo.value"
          :transition="props.transition.demo.value"
          @show="events.show.emited = true"
          @hide="events.hide.emited = true" />
      </vk-button>
      <span ref="spanref">
        Hover me
        <vk-tooltip
          content="Tooltip 2"
          :placement="props.placement.demo.value"
          :transition="props.transition.demo.value"
          @show="events.show.emited = true"
          @hide="events.hide.emited = true" />
      </span>
    </div>
    <!-- TABS -->
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
      <vk-tab label="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events"></vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </layouts-default>
</template>

<script>
import Component from 'lib/Tooltip'
import mixin from './_mixin'
import { mergeProps } from 'helpers/pages'

export default {
  name: 'PageTooltip',
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    props: mergeProps(Component.props, props),
    events,
    example
  })
}

const props = {
  target: {
    description: `The element reference to which the tooltip should be attached to.
      Defaults to parent node element.`
  },
  placement: {
    description: 'Specifies the placement point of the tooltip.',
    demo: {
      type: 'Select',
      options: [
        { text: 'top', value: 'top' },
        { text: 'top-start', value: 'top-start' },
        { text: 'top-end', value: 'top-end' },
        { text: 'right', value: 'right' },
        { text: 'right-start', value: 'right-start' },
        { text: 'right-end', value: 'right-end' },
        { text: 'bottom', value: 'bottom' },
        { text: 'bottom-start', value: 'bottom-start' },
        { text: 'bottom-end', value: 'bottom-end' },
        { text: 'left', value: 'left' },
        { text: 'left-start', value: 'left-start' },
        { text: 'left-end', value: 'left-end' }
      ],
      value: 'top'
    }
  },
  modifiers: {
    description: `Modifiers are setting that alter the behavior of the popper, such as the offset.
      Checkout the <a href="https://popper.js.org/popper-documentation.html">Popper.js Documentation</a>
      for all possibilities.`
  },
  transition: {
    description: `The name prefix to be applied to the <a href="https://vuejs.org/v2/guide/transitions.html#Transition-Classes">
      transition classes</a>.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: 'vk-tooltip-transition' },
        { text: 'Fade', value: 'vk-transition-fade' }
      ],
      value: 'vk-transition-fade'
    }
  }
}

const events = {
  show: {
    description: 'Emited when the tooltip is shown.',
    emited: false
  },
  hide: {
    description: 'Emited when the tooltip is hidden.',
    emited: false
  }
}

const example =
`<button>
  Hover me
  <vk-tooltip content="Content" />
</button>`
</script>
