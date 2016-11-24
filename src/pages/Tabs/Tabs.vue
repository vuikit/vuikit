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
      <vk-tabs-item name="Tab 1">Content Tab 1</vk-tabs-item>
      <vk-tabs-item name="Tab 2">Content Tab 2</vk-tabs-item>
      <vk-tabs-item name="Tab 3">Content Tab 3</vk-tabs-item>
      <vk-tabs-item disabled name="Tab 4">Content Tab 4</vk-tabs-item>
    </vk-tabs>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-tabs</code> component renders a UIkit Tabs navigation switching
      it content using <code>vk-switcher</code>.
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
import Component from '../../lib/Tabs'
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
        { text: 'default', value: '' },
        { text: '1-1', value: '1-1' },
        { text: '1-4', value: '1-4' }
      ],
      value: ''
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
`<vk-tabs {attrs}
  :index="index"
  @change="index = arguments[0]">
  <vk-tabs-item name="Tab 1">Content Tab 1</vk-tabs-item>
  <vk-tabs-item name="Tab 2">Content Tab 2</vk-tabs-item>
  <vk-tabs-item name="Tab 3">Content Tab 3</vk-tabs-item>
  <vk-tabs-item disabled name="Tab 4">Content Tab 4</vk-tabs-item>
</vk-tabs>`
</script>
