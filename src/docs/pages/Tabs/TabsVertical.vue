<template>
  <div>
    <docs-page
      :events="events"
      :slots="slots"
      :code="code">
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
    props: Helper.getProps('TabsVertical', props),
    tabProps: Helper.getProps('Tab', tabProps),
    slots,
    events,
    code
  })
}

const code =
`<vk-tabs-vertical>
  <vk-tab label="Tab 1">Content Tab 1</vk-tab>
  <vk-tab label="Tab 2">Content Tab 2</vk-tab>
  <vk-tab label="Tab 3">Content Tab 3</vk-tab>
  <vk-tab label="Tab 4" disabled>Content Tab 4</vk-tab>
</vk-tabs-vertical>`

const props = {
  align: {
    description: 'Determines the tabs vertical alignment.',
    options: ['left', 'right']
  },
  headerWidth: {
    description: 'Determines the tabs width using the <i>UIkit Grid</i> classes.',
    options: ['1-2', '1-3', '1-4', '2-3']
  },
  bodyWidth: {
    description: 'Determines the content width using the <i>UIkit Grid</i> classes.',
    options: ['1-2', '1-3', '1-4', '2-3']
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

const slots = {
  default: {
    description: 'The default slot on each <code>vk-tab</code> holds the tab content.'
  }
}
</script>
