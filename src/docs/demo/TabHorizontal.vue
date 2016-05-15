<template>
  <div>
    <div class="uk-margin-large">
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
    </div>
    <api-prop-table :rows="apiRows" :values="$data.api"></api-prop-table>
  </div>
</template>

<script>
import * as Helper from '../helper'
import { merge } from 'lodash'

export default {
  data: () => ({
    api: Helper.getComponentPropsDefaults('TabHorizontal')
  }),
  computed: {
    apiRows: function () {
      return merge({}, Helper.getComponentProps('TabHorizontal'), apiDemoData)
    }
  }
}

const apiDemoData = {
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
    description: `Determines the width of the tabs items using the UIkit Grid
      classes.`,
    options: {
      'Auto': '',
      '1-1': '1-1',
      '1-2': '1-2',
      '1-3': '1-3',
      '1-4': '1-4',
      '1-5': '1-5',
      '1-6': '1-6',
      '1-10': '1-10'
    }
  }
}
</script>
