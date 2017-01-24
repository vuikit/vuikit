<template>
  <div>
    <div class="uk-margin-large">
      <vk-tabs
        :activeTab="props.activeTab.demo.value"
        :flip="props.flip.demo.value"
        :bottom="props.bottom.demo.value"
        :center="props.center.demo.value"
        :width="props.width.demo.value"
        :transition="props.transition.demo.value"
        @change="tab => {
          events.change.emited = true
          props.activeTab.demo.value = tab
        }">
        <vk-tab label="Tab 1">Content Tab 1</vk-tab>
        <vk-tab label="Tab 2">Content Tab 2</vk-tab>
        <vk-tab label="Tab 3">Content Tab 3</vk-tab>
        <vk-tab disabled label="Tab 4">Content Tab 4</vk-tab>
      </vk-tabs>
    </div>
    <vk-tabs
      :activeTab="activeTab"
      @change="tab => { activeTab = tab }">
      <vk-tab label="Tabs Props">
        <vk-docs-props
          :props="props"
          @change="(prop, value) => props[prop].demo.value = value">
        </vk-docs-props>
      </vk-tab>
      <vk-tab label="Tab Props">
        <vk-docs-props :props="tabProps" />
      </vk-tab>
      <vk-tab label="Tab Slots">
        <vk-docs-slots :slots="slots" />
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events :events="events" />
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import Tab from 'lib/Tabs/Tab'
import Tabs from 'lib/Tabs/Tabs'
import mixin from '../_mixin'
import { mergeProps } from 'helpers/pages'
import { getFinalProps } from 'helpers/component'

export default {
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    props: mergeProps(getFinalProps(Tabs), props),
    tabProps: mergeProps(Tab.props, tabProps),
    slots,
    events,
    example
  })
}

const props = {
  activeTab: {
    description: 'The currently active tab referenced by its alias.',
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
        { text: '1-4', value: '1-4' }
      ],
      value: ''
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
      value: 'vk-transition-fade'
    }
  }
}

const tabProps = {
  alias: {
    description: `Unique identifier for the tab. If omited defaults to the ordinal
      number of the tab (e.g. the first tab alias would be <code>1</code>).`
  },
  label: {
    description: 'Title of the tab.'
  },
  disabled: {
    description: 'Whether the tab should be disabled.'
  }
}

const slots = {
  default: {
    description: 'The tab content.'
  },
  header: {
    description: 'A Scoped Slot to override the header output.'
  }
}

const events = {
  change: {
    description: 'Emited on the intention to change the tab passing as argument the new tab alias.',
    emited: false
  }
}

const example =
`<vk-tabs :activeTab="activeTab" @change="tab => { activeTab = tab }">
  <vk-tab label="Tab 1">Content Tab 1</vk-tab>
  <vk-tab label="Tab 2">Content Tab 2</vk-tab>
  <vk-tab label="Tab 3">Content Tab 3</vk-tab>
  <vk-tab label="Tab 4" disabled>Content Tab 4</vk-tab>
</vk-tabs>`
</script>
