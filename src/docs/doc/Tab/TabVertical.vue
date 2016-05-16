<template>
  <div>
    <vk-tab-vertical
      :flip="api.flip"
      :bottom="api.bottom"
      :align="api.align"
      :tabs-width="api.tabsWidth"
      :content-width="api.contentWidth">
      <vk-tab title="Tab 1">Content Tab 1</vk-tab>
      <vk-tab title="Tab 2">Content Tab 2</vk-tab>
      <vk-tab title="Tab 3">Content Tab 3</vk-tab>
      <vk-tab title="Tab 4" disabled>Content Tab 4</vk-tab>
    </vk-tab-vertical>
    <div class="uk-margin-large">
      The <code>vk-tab-vertical</code> component consists of clickable
      <code>vk-tab</code> tabs, that are aligned in a column.
    </div>
    <vk-tab-horizontal>
      <vk-tab title="Props">
        <table-api-props :rows="apiPropsRows" :values="$data.api"></table-api-props>
      </vk-tab>
      <vk-tab title="Code">
        <pre><code v-encode></code></pre>
      </vk-tab>
    <vk-tab-horizontal>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import { merge } from 'lodash'

export default {
  data: () => ({
    api: Helper.getComponentPropsDefaults('TabVertical')
  }),
  computed: {
    demoCode: () => demoCode,
    apiPropsRows: () => merge({},
      Helper.getComponentProps('TabVertical'),
      demoApiProps
    )
  }
}

const demoCode =
`<vk-tab-vertical>
  <vk-tab title="Tab 1">Content Tab 1</vk-tab>
  <vk-tab title="Tab 2">Content Tab 2</vk-tab>
  <vk-tab title="Tab 3">Content Tab 3</vk-tab>
  <vk-tab title="Tab 4" disabled>Content Tab 4</vk-tab>
</vk-tab-vertical>`

const demoApiProps = {
  align: {
    description: 'Determines the tabs vertical alignment.',
    options: ['left', 'right']
  },
  tabsWidth: {
    description: 'Determines the tabs width using the <i>UIkit Grid</i> classes.',
    options: ['1-2', '1-3', '1-4', '2-3']
  },
  contentWidth: {
    description: 'Determines the content width using the <i>UIkit Grid</i> classes.',
    options: ['1-2', '1-3', '1-4', '2-3']
  }
}
</script>
