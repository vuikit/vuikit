<template>
  <div>
    <vk-tab-horizontal v-ref:demo
      :flip="props.flip.value"
      :bottom="props.bottom.value"
      :center="props.center.value"
      :width="props.width.value">
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
        <table-api-props :rows="props"></table-api-props>
      </vk-tab>
      <vk-tab title="Code">
        <pre><code v-encode="code"></code></pre>
      </vk-tab>
    <vk-tab-horizontal>
  </div>
</template>

<script>
import * as Helper from '../../helper'
import mixins from '../../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    props: Helper.getProps('TabHorizontal', props),
    code
  })
}

const code =
`<vk-tab-horizontal>
  <vk-tab title="Tab 1">Content Tab 1</vk-tab>
  <vk-tab title="Tab 2">Content Tab 2</vk-tab>
  <vk-tab title="Tab 3">Content Tab 3</vk-tab>
  <vk-tab title="Tab 4" disabled>Content Tab 4</vk-tab>
</vk-tab-horizontal>`

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
</script>
