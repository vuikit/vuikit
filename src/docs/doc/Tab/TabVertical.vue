<template>
  <div>
    <vk-tab-vertical v-ref:demo
      :align="props.align.value"
      :tabs-width="props.tabsWidth.value"
      :content-width="props.contentWidth.value">
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
        <table-api-props :rows="props"></table-api-props>
      </vk-tab>
      <vk-tab title="Events">
        <table-api-events :rows="events"></table-api-events>
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
    props: Helper.getProps('TabVertical', props),
    events,
    code
  })
}

const code =
`<vk-tab-vertical>
  <vk-tab title="Tab 1">Content Tab 1</vk-tab>
  <vk-tab title="Tab 2">Content Tab 2</vk-tab>
  <vk-tab title="Tab 3">Content Tab 3</vk-tab>
  <vk-tab title="Tab 4" disabled>Content Tab 4</vk-tab>
</vk-tab-vertical>`

const props = {
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

const events = {
  change: {
    description: 'Emited when there was made some tab selection.'
  }
}

</script>
