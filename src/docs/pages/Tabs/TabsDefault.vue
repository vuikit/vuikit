<template>
  <div>
    <docs-page
      :props="props"
      :events="events"
      :code="code">
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
        The <code>vk-tabs</code> component consists of clickable
        <code>vk-tab</code> tabs, that are aligned side by side.
      </div>
      <div slot="props">
        <vk-subnav style="line" v-ref:nav>
          <vk-subnav-item>vk-tabs</vk-subnav-item>
          <vk-subnav-item>vk-tab</vk-subnav-item>
        </vk-subnav>
        <vk-switcher :connect="$refs.nav">
          <vk-switch>
            <table-props :rows="props"></table-props>
          </vk-switch>
          <vk-switch>
            <table-props :rows="tabProps" :demo="false"></table-props>
          </vk-switch>
        </vk-switcher>
      </div>
    </docs-page>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('Tabs', props),
    tabProps: Helper.getProps('Tab', tabProps),
    events,
    code
  })
}

const code =
`<vk-tabs>
  <vk-tab label="Tab 1">Content Tab 1</vk-tab>
  <vk-tab label="Tab 2">Content Tab 2</vk-tab>
  <vk-tab label="Tab 3">Content Tab 3</vk-tab>
  <vk-tab label="Tab 4" disabled>Content Tab 4</vk-tab>
</vk-tabs>`

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
    options: ['default', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-10']
  }
}

const tabProps = {
  label: {
    description: 'Determines the tab header text.'
  },
  disabled: {
    description: 'Determines whether or not the tab can be selected.'
  }
}

const events = {
  change: {
    description: 'Emited when there was made some tab selection.'
  }
}
</script>
