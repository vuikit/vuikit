<template>
  <docs-page
    component="tabs-vertical"
    :props="props"
    :slots="true"
    :events="events"
    :code-slot="codeSlot">
    <div slot="demo">
      <vk-tabs-vertical v-ref:demo
        :align="props.align.value"
        :header-width="props.headerWidth.value"
        :body-width="props.bodyWidth.value">
        <vk-tab label="Tab 1">Content Tab 1</vk-tab>
        <vk-tab label="Tab 2">Content Tab 2</vk-tab>
        <vk-tab label="Tab 3">Content Tab 3</vk-tab>
        <vk-tab label="Tab 4" disabled>Content Tab 4</vk-tab>
      </vk-tabs-vertical>
    </div>
    <div slot="desc">
      The <code>vk-tabs-vertical</code> component is a variation that renders a vertical tabbed navigation.
    </div>
    <div slot="props">
      <vk-subnav line v-ref:nav>
        <vk-subnav-item>vk-tabs</vk-subnav-item>
        <vk-subnav-item>vk-tab</vk-subnav-item>
      </vk-subnav>
      <vk-switcher :connect="$refs.nav">
        <vk-switch>
          <table-props :rows="props"></table-props>
        </vk-switch>
        <vk-switch>
          <table-props :rows="propsTab" :demo="false"></table-props>
        </vk-switch>
      </vk-switcher>
    </div>
    <div slot="slots">
      <vk-subnav line v-ref:slots-nav>
        <vk-subnav-item>vk-tabs-vertical</vk-subnav-item>
        <vk-subnav-item>vk-tab</vk-subnav-item>
      </vk-subnav>
      <vk-switcher :connect="$refs.slotsNav">
        <vk-switch>
          <table-slots :rows="slotsTabs"></table-slots>
        </vk-switch>
        <vk-switch>
          <table-slots :rows="slotsTab"></table-slots>
        </vk-switch>
      </vk-switcher>
    </div>
  </docs-page>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('TabsVertical', props),
    propsTab: Helper.getProps('Tab', propsTab),
    slotsTabs,
    slotsTab,
    codeSlot,
    events
  })
}

const codeSlot =
`<vk-tab label="Tab 1">Content Tab 1</vk-tab>
<vk-tab label="Tab 2">Content Tab 2</vk-tab>
<vk-tab label="Tab 3">Content Tab 3</vk-tab>`

const props = {
  align: {
    description: 'Determines the tabs vertical alignment.',
    options: ['right']
  },
  headerWidth: {
    description: 'Determines the tabs width using the <i>UIkit Grid</i> classes.',
    options: ['1-2', '1-4', '2-3']
  },
  bodyWidth: {
    description: 'Determines the content width using the <i>UIkit Grid</i> classes.',
    options: ['1-2', '1-3', '1-4']
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
</script>
