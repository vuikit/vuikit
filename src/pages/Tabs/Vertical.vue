<template>
  <div class="uk-block">
    <h2>Tabs Vertical</h2>
    <hr class="uk-article-divider">
    <!-- DEMO -->
    <vk-tabs-vertical ref="demo"
      :align="props.align.demo.value"
      :header-width="props.headerWidth.demo.value"
      :body-width="props.bodyWidth.demo.value">
      <vk-tab label="Tab 1">Content Tab 1</vk-tab>
      <vk-tab label="Tab 2">Content Tab 2</vk-tab>
      <vk-tab label="Tab 3">Content Tab 3</vk-tab>
      <vk-tab label="Tab 4" disabled>Content Tab 4</vk-tab>
    </vk-tabs-vertical>
    <!-- DESC -->
    <div class="uk-margin-large">
      The <code>vk-tabs-vertical</code> component is a variation that renders a vertical tabbed navigation.
    </div>
    <!-- TABS -->
    <!-- <vk-tabs>
      <vk-tab label="Props">
        <vk-subnav line v-ref:nav>
          <vk-subnav-item>vk-tabs-vertical</vk-subnav-item>
          <vk-subnav-item>vk-tab</vk-subnav-item>
        </vk-subnav>
        <vk-switcher :connect="$refs.nav">
          <vk-switch>
            <vk-docs-props :props="props"></vk-docs-props>
          </vk-switch>
          <vk-switch>
            <vk-docs-props :props="propsTab"></vk-docs-props>
          </vk-switch>
        </vk-switcher>
      </vk-tab>
      <vk-tab label="Slots">
        <vk-subnav line v-ref:slots-nav>
          <vk-subnav-item>vk-tabs-vertical</vk-subnav-item>
          <vk-subnav-item>vk-tab</vk-subnav-item>
        </vk-subnav>
        <vk-switcher :connect="$refs.slotsNav">
          <vk-switch>
            <vk-docs-slots :slots="slotsTabs"></vk-docs-slots>
          </vk-switch>
          <vk-switch>
            <vk-docs-slots :slots="slotsTab"></vk-docs-slots>
          </vk-switch>
        </vk-switcher>
      </vk-tab>
      <vk-tab label="Events">
        <vk-docs-events
          :events="events"
          :connect="$refs.demo">
        </vk-docs-events>
      </vk-tab>
      <vk-tab label="Example">
        <vk-docs-code :code="code"></vk-docs-code>
      </vk-tab>
    </vk-tabs> -->
  </div>
</template>

<script>
import { merge, pick } from 'lodash'
import TabsVertical from '../../lib/Tabs/Vertical'
import Tab from '../../lib/Tabs/Tab'
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    props: merge(props, pick(TabsVertical.props, Object.keys(props))),
    propsTab: merge(propsTab, pick(Tab.props, Object.keys(propsTab))),
    slotsTabs,
    slotsTab,
    events,
    example
  })
}

const props = {
  align: {
    description: 'Determines the tabs vertical alignment.',
    demo: {
      options: ['right']
    }
  },
  headerWidth: {
    description: 'Determines the tabs width using the <i>UIkit Grid</i> classes.',
    demo: {
      options: ['1-2', '1-4', '2-3']
    }
  },
  bodyWidth: {
    description: 'Determines the content width using the <i>UIkit Grid</i> classes.',
    demo: {
      options: ['1-2', '1-3', '1-4']
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
    description: 'Emited when the selected tab has changed.'
  }
}

const example =
`<vk-tabs-vertical {attrs}>
  <vk-tab label="Tab 1">Content Tab 1</vk-tab>
  <vk-tab label="Tab 2">Content Tab 2</vk-tab>
  <vk-tab label="Tab 3">Content Tab 3</vk-tab>
</vk-tabs-vertical>`
</script>
