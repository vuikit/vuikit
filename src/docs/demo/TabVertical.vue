<template>
  <div>
    <div class="uk-margin-large">
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
    </div>
    <api-props-table :rows="apiRows" :values="$data.api"></api-props-table>
  </div>
</template>

<script>
import * as Helper from '../helper'
import { merge } from 'lodash'

export default {
  data: () => ({
    api: Helper.getComponentPropsDefaults('TabVertical')
  }),
  computed: {
    apiRows: function () {
      return merge({}, Helper.getComponentProps('TabVertical'), apiDemoData)
    }
  }
}

const apiDemoData = {
  align: {
    description: 'Determines the tabs vertical alignment.',
    options: { Left: 'left', Right: 'right' }
  },
  tabsWidth: {
    description: 'Determines the tabs width using the UIkit grid classes.',
    options: {
      '1-2': '1-2',
      '1-3': '1-3',
      '1-4': '1-4',
      '2-3': '2-3'
    }
  },
  contentWidth: {
    description: 'Determines the content width using the UIkit grid classes.',
    options: {
      '1-2': '1-2',
      '1-3': '1-3',
      '1-4': '1-4',
      '2-3': '2-3'
    }
  }
}
</script>
