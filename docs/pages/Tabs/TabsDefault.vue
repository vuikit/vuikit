<template>
  <docs-page
    component="tabs"
    :slots="true"
    :props="props"
    :events="events"
    :code-slot="codeSlot">
    <div slot="demo">
      <vk-tabs v-ref:demo
        :flip="props.flip.value"
        :bottom="props.bottom.value"
        :center="props.center.value"
        :width="props.width.value">
        <vk-tab label="Tab 1">Content Tab 1</vk-tab>
        <vk-tab label="Tab 2">Content Tab 2</vk-tab>
        <vk-tab label="Tab 3">Content Tab 3</vk-tab>
        <vk-tab label="Tab 4" disabled>Content Tab 4</vk-tab>
      </vk-tabs>
    </div>
    <div slot="desc">
      The <code>vk-tabs</code> component together with a <code>vk-tab</code> renders a tabbed navigation.
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
        <vk-subnav-item>vk-tabs</vk-subnav-item>
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
    props: Helper.getProps('Tabs', props),
    propsTab: Helper.getProps('Tab', propsTab),
    slotsTabs,
    slotsTab,
    events,
    codeSlot
  })
}

const codeSlot =
`<vk-tab label="Tab 1">Content Tab 1</vk-tab>
<vk-tab label="Tab 2">Content Tab 2</vk-tab>
<vk-tab label="Tab 3">Content Tab 3</vk-tab>`

const props = {
  flip: {
    description: `Determines whether or not the tabs are aligned to the right
      and in reversed order.`
  },
  bottom: {
    description: 'Determines whether or not the tabs are placed at the bottom.'
  },
  center: {
    description: 'Determines whether or not the tabs are centered.'
  },
  width: {
    description: `Determines the width of the tabs items using the <i>UIkit Grid</i>
      classes.`,
    options: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-10']
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
