<template>
  <layouts-default>
    <div class="uk-block">
      <h2>Tooltip</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <button class="uk-button">
        Hover me
        <vk-tooltip
          :placement="props.placement.demo.value"
          :offset="props.offset.demo.value"
          :delay="props.delay.demo.value"
          @show="events.show.emited = true"
          @hide="events.hide.emited = true">
          Tooltip 1
        </vk-tooltip>
      </button>
      <span>
        Hover me
        <vk-tooltip
          :placement="props.placement.demo.value"
          :offset="props.offset.demo.value"
          :delay="props.delay.demo.value"
          @show="events.show.emited = true"
          @hide="events.hide.emited = true">
          Tooltip 2
        </vk-tooltip>
      </span>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-tooltip</code> component creates a nicely looking tooltip.
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
import Component from '../lib/Tooltip'
import mixin from './_mixin'
import { mergeProps } from '../helpers/pages'

export default {
  name: 'PageTooltip',
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
  offset: {
    description: 'Specifies the tooltip horizontal and vertical offset.',
    demo: {
      type: 'Select',
      options: [
        { text: '0 0', value: '0 0' },
        { text: '0 5', value: '0 5' },
        { text: '10 10', value: '10 10' }
      ],
      value: '0 5'
    }
  },
  delay: {
    description: 'Specifies the tooltip delay in ms.',
    demo: {
      type: 'Select',
      options: [
        { text: '0', value: 0 },
        { text: '300', value: 300 },
        { text: '500', value: 500 },
        { text: '100', value: 1000 }
      ],
      value: 0
    }
  }
}

const slots = {
  default: {
    description: 'The container for the tooltip content.'
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
`<span>
  Hover me
  <vk-tooltip {attrs}>
    Content
  </vk-tooltip>
</span>`
</script>
