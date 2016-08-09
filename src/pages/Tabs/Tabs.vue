<template>
  <div class="uk-block">
    <h2>Tabs</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-tabs
      :index="props.index.demo.value"
      :flip="props.flip.demo.value"
      :bottom="props.bottom.demo.value"
      :center="props.center.demo.value"
      :width="props.width.demo.value"
      @change="
        events.change.emited = true,
        props.index.demo.value = arguments[0]
      ">
      <vk-tabs-item>Tab 1</vk-tabs-item>
      <vk-tabs-item>Tab 2</vk-tabs-item>
      <vk-tabs-item>Tab 3</vk-tabs-item>
      <vk-tabs-item disabled>Tab 4</vk-tabs-item>
      <vk-switcher slot="switcher"
        :index="props.index.demo.value">
        <vk-switcher-item>Content Tab 1</vk-switcher-item>
        <vk-switcher-item>Content Tab 2</vk-switcher-item>
        <vk-switcher-item>Content Tab 3</vk-switcher-item>
      </vk-switcher>
    </vk-tabs>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-tabs</code> component together with a <code>vk-tabs-item</code> renders a
      tabbed navigation which would switch it content using <code>vk-switcher</code>.
    </div>
    <!-- TABS -->
    <tm-tabs>
      <tm-tabs-item name="Props">
        <vk-docs-props
          :props="props"
          @change="props[arguments[0]].demo.value = arguments[1]">
        </vk-docs-props>
      </tm-tabs-item>
      <tm-tabs-item name="Slots">
        <vk-docs-slots :slots="slots"></vk-docs-slots>
      </tm-tabs-item>
      <tm-tabs-item name="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </tm-tabs-item>
    </tm-tabs>
  </div>
</template>

<script>
import Component from '../../lib/Tabs'
import mixin from '../_mixin'
import { mergeProps } from '../helper'

export default {
  mixins: [mixin],
  data: () => ({
    props: mergeProps(Component.props, props),
    slots,
    events,
    example
  })
}

const props = {
  index: {
    description: 'The currently active tab referenced by its order index.',
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
  flip: {
    description: `Determines whether or not the tabs are aligned to the right
      and in reversed order.`,
    demo: {
      value: false
    }
  },
  bottom: {
    description: 'Determines whether or not the tabs are placed at the bottom.',
    demo: {
      value: false
    }
  },
  center: {
    description: 'Determines whether or not the tabs are centered.',
    demo: {
      value: false
    }
  },
  width: {
    description: 'Determines the tabs width using the <i>UIkit Grid</i> classes.',
    demo: {
      type: 'Select',
      options: [
        { text: '1-1', value: '1-1' },
        { text: '1-2', value: '1-2' },
        { text: '1-3', value: '1-3' },
        { text: '1-4', value: '1-4' },
        { text: '1-5', value: '1-5' },
        { text: '1-6', value: '1-6' },
        { text: '1-10', value: '1-10' }
      ]
    }
  }
}

const slots = {
  default: {
    description: 'The list of <code>vk-tabs-item</code> components.'
  },
  switcher: {
    description: `The place for the <code>vk-switcher</code> or any component that
      will deal with the content`
  }
}

const events = {
  change: {
    description: 'Emited when the selected tab has changed.',
    emited: false
  }
}

const example =
`<vk-tabs {attrs}
  @change="index = arguments[0]">
  <tm-tabs-item>Tab 1</tm-tabs-item>
  <tm-tabs-item>Tab 2</tm-tabs-item>
  <tm-tabs-item>Tab 3</tm-tabs-item>
  <tm-tabs-item disabled>Tab 4</tm-tabs-item>
  <vk-switcher slot="switcher"
    :index="index">
    <vk-switcher-item>Content Tab 1</vk-switcher-item>
    <vk-switcher-item>Content Tab 2</vk-switcher-item>
    <vk-switcher-item>Content Tab 3</vk-switcher-item>
  </vk-switcher>
</vk-tabs>`
</script>
