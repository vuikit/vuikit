<template>
  <div>
    <div class="uk-margin-large">
      <vk-tabs-vertical
        :activeTab="props.activeTab.demo.value"
        :flip="props.flip.demo.value"
        :width="props.width.demo.value"
        :contentWidth="props.contentWidth.demo.value"
        :transition="props.transition.demo.value"
        @change="tab => {
          props.activeTab.demo.value = tab
        }">
        <vk-tab label="Tab 1">Content Tab 1</vk-tab>
        <vk-tab label="Tab 2">Content Tab 2</vk-tab>
        <vk-tab label="Tab 3">Content Tab 3</vk-tab>
        <vk-tab disabled label="Tab 4">Content Tab 4</vk-tab>
      </vk-tabs-vertical>
    </div>
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
      <vk-tab label="Props">
        <vk-docs-props :props="props" @change="
          (prop, value) => props[prop].demo.value = value
        " />
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Tabs from 'lib/Tabs/TabsVertical'
import mixin from '../_mixin'
import { mergeProps } from 'helpers/pages'
import { getFinalProps } from 'helpers/component'

export default {
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    props: mergeProps(getFinalProps(Tabs), props),
    example
  })
}

const props = {
  activeTab: {
    description: 'The currently active tab referenced by its name.',
    demo: {
      type: 'Select',
      options: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 }
      ],
      value: 1
    }
  },
  flip: {
    description: 'Determines whether or not flop the columns order.',
    demo: {
      type: 'Boolean',
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
  },
  transition: {
    description: `Specifies the prefix to be used for the transition classes.`,
    demo: {
      type: 'Select',
      options: [
        { text: 'Default', value: 'vk-tabs-transition' },
        { text: 'Fade', value: 'vk-transition-fade' }
      ],
      value: ''
    }
  }
}

const example =
`<vk-tabs-vertical :activeTab="activeTab" @change="tab => { activeTab = tab }">
  <vk-tab label="Tab 1">Content Tab 1</vk-tab>
  <vk-tab label="Tab 2">Content Tab 2</vk-tab>
  <vk-tab label="Tab 3">Content Tab 3</vk-tab>
  <vk-tab label="Tab 4" disabled>Content Tab 4</vk-tab>
</vk-tabs-vertical>`
</script>
