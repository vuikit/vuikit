<template>
  <div class="uk-block">
    <h2>Tabs</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-tabs
      :flip="props.flip.demo.value"
      :bottom="props.bottom.demo.value"
      :center="props.center.demo.value"
      :width="props.width.demo.value"
      @change="events.change.emited = true">
      <vk-tab label="Tab 1">Content Tab 1</vk-tab>
      <vk-tab label="Tab 2">Content Tab 2</vk-tab>
      <vk-tab label="Tab 3">Content Tab 3</vk-tab>
      <vk-tab label="Tab 4" disabled>Content Tab 4</vk-tab>
    </vk-tabs>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-tabs</code> component together with a <code>vk-tab</code> renders a tabbed navigation.
    </div>
    <!-- TABS -->
    <vk-tabs>
      <vk-tab label="Props">
        <!-- <vk-subnav line v-ref:nav>
          <vk-subnav-item>vk-tabs</vk-subnav-item>
          <vk-subnav-item>vk-tab</vk-subnav-item>
        </vk-subnav>
        <vk-switcher :connect="$refs.nav">
          <vk-switch>
            <vk-docs-props :props="props"></vk-docs-props>
          </vk-switch>
          <vk-switch>
            <vk-docs-props :props="propsTab"></vk-docs-props>
          </vk-switch>
        </vk-switcher> -->
      </vk-tab>
      <vk-tab label="Slots">
        <!-- <vk-subnav line v-ref:slots-nav>
          <vk-subnav-item>vk-tabs</vk-subnav-item>
          <vk-subnav-item>vk-tab</vk-subnav-item>
        </vk-subnav>
        <vk-switcher :connect="$refs.slotsNav">
          <vk-switch>
            <vk-docs-slots :slots="slotsTabs"></vk-docs-slots>
          </vk-switch>
          <vk-switch>
            <vk-docs-slots :slots="slotsTab"></vk-docs-slots>
          </vk-switch>
        </vk-switcher> -->
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events
          :events="events">
        </vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code>{{ code }}</vk-docs-code>
      </vk-tab>
    </vk-tabs>
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import Tabs from '../../lib/Tabs'
import Tab from '../../lib/Tab'
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(Tabs.props, Object.keys(props))),
    propsTab: merge(propsTab, pick(Tab.props, Object.keys(propsTab))),
    slotsTabs,
    slotsTab,
    events,
    example
  })
}

const props = {
  flip: {
    description: `Determines whether or not the tabs are aligned to the right
      and in reversed order.`,
    demo: {}
  },
  bottom: {
    description: 'Determines whether or not the tabs are placed at the bottom.',
    demo: {}
  },
  center: {
    description: 'Determines whether or not the tabs are centered.',
    demo: {}
  },
  width: {
    description: `Determines the width of the tabs items using the <i>UIkit Grid</i>
      classes.`,
    demo: {
      options: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-10']
    }
  }
}

const propsTab = {
  label: {
    description: 'Determines the tab header text.'
  },
  disabled: {
    description: 'Determines whether or not the tab can be selected.'
  }
}

const slotsTabs = {
  default: {
    description: 'The list of <code>vk-tab</code> components.'
  }
}

const slotsTab = {
  default: {
    description: 'The content of the tab. Can be text, HTML or event other components.'
  }
}

const events = {
  change: {
    description: 'Emited when the selected tab has changed.',
    emited: false
  }
}

const example =
`<vk-tabs {attrs}>
  <vk-tab label="Tab 1">Content Tab 1</vk-tab>
  <vk-tab label="Tab 2">Content Tab 2</vk-tab>
  <vk-tab label="Tab 3">Content Tab 3</vk-tab>
</vk-tabs>`
</script>
