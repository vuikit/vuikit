<template>
  <div>
    <vk-tab-horizontal
      :flip="api.flip"
      :bottom="api.bottom"
      :center="api.center"
      :width="api.width">
      <vk-tab title="Tab 1">Content Tab 1</vk-tab>
      <vk-tab title="Tab 2">Content Tab 2</vk-tab>
      <vk-tab title="Tab 3">Content Tab 3</vk-tab>
      <vk-tab title="Tab 4" disabled>Content Tab 4</vk-tab>
    </vk-tab-horizontal>
    <div class="uk-margin-large">
      The <code>vk-tab-horizontal</code> component consists of clickable
      <code>vk-tab</code> tabs, that are aligned side by side.
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
    api: Helper.getPropsDefaults(Helper.getProps('TabHorizontal'))
  }),
  computed: {
    demoCode: () => demoCode,
    apiPropsRows: () => merge({},
      Helper.getProps('TabHorizontal'),
      demoApiProps
    )
  }
}

const demoCode =
`<vk-tab-horizontal>
  <vk-tab title="Tab 1">Content Tab 1</vk-tab>
  <vk-tab title="Tab 2">Content Tab 2</vk-tab>
  <vk-tab title="Tab 3">Content Tab 3</vk-tab>
  <vk-tab title="Tab 4" disabled>Content Tab 4</vk-tab>
</vk-tab-horizontal>`

const demoApiProps = {
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
</script>
