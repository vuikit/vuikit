<template>
  <div class="uk-block">
    <h2>Tabs Vertical</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-tabs-vertical
      :index="props.index.demo.value"
      :flip="props.flip.demo.value"
      :width="props.width.demo.value"
      :contentWidth="props.contentWidth.demo.value"
      @change="
        events.change.emited = true,
        props.index.demo.value = arguments[0]
      ">
      <vk-tabs-item name="Tab 1">Content Tab 1</vk-tabs-item>
      <vk-tabs-item name="Tab 2">Content Tab 2</vk-tabs-item>
      <vk-tabs-item name="Tab 3">Content Tab 3</vk-tabs-item>
      <vk-tabs-item disabled name="Tab 4">Content Tab 4</vk-tabs-item>
    </vk-tabs-vertical>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-tabs-vertical</code> component is a variation that renders a
      vertical tabbed navigation.
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
        <vk-docs-events
          :events="events">
        </vk-docs-events>
      </vk-tabs-item>
      <vk-tabs-item name="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tabs-item>
    </vk-tabs>
  </div>
</template>

<script>
import Component from '../../lib/TabsVertical'
import mixin from '../_mixin'
import { mergeProps } from '../../helpers/pages'

export default {
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
    description: 'Determines whether or not the tabs are aligned to the right.',
    demo: {
      value: false
    }
  },
  width: {
    description: 'Determines the tabs width using the <i>UIkit Grid</i> classes.',
    demo: {
      type: 'Select',
      options: [
        { text: '1-2', value: '1-2' },
        { text: '1-3', value: '1-3' },
        { text: '1-4', value: '1-4' },
        { text: '2-3', value: '2-3' }
      ],
      value: '1-3'
    }
  },
  contentWidth: {
    description: 'Determines the content width using the <i>UIkit Grid</i> classes.',
    demo: {
      type: 'Select',
      options: [
        { text: '1-2', value: '1-2' },
        { text: '1-3', value: '1-3' },
        { text: '1-4', value: '1-4' },
        { text: '2-3', value: '2-3' }
      ],
      value: '2-3'
    }
  }
}

const slots = {
  default: {
    description: 'The list of <code>vk-tabs-item</code> components.'
  }
}

const events = {
  change: {
    description: 'Emited on the intention to change the tab passing as argument the new tab index.',
    emited: false
  }
}

const example =
`<vk-tabs-vertical {attrs}
  :index="index"
  @change="index = arguments[0]">
  <vk-tabs-item name="Tab 1">Content Tab 1</vk-tabs-item>
  <vk-tabs-item name="Tab 2">Content Tab 2</vk-tabs-item>
  <vk-tabs-item name="Tab 3">Content Tab 3</vk-tabs-item>
  <vk-tabs-item disabled name="Tab 4">Content Tab 4</vk-tabs-item>
</vk-tabs-vertical>`
</script>
