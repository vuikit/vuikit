<template>
  <div>
    <div class="uk-margin-large">
      <vk-button-radio
        :type="api.type"
        :group.sync="api.group"
        :value.sync="api.value">
        <vk-button value="1">Button 1</vk-button>
        <vk-button value="2">Button 2</vk-button>
        <vk-button value="3">Button 3</vk-button>
      </vk-button-radio>
    </div>
    <api-props-table :rows="apiRows" :values="$data.api"></api-props-table>
  </div>
</template>

<script>
import * as Helper from '../helper'
import { merge } from 'lodash'

export default {
  data: () => ({
    api: Helper.getComponentPropsDefaults('ButtonRadio')
  }),
  computed: {
    apiRows: function () {
      return merge({}, Helper.getComponentProps('ButtonRadio'), apiDemoData)
    }
  }
}

const apiDemoData = {
  value: {
    description: 'The current value determined by the active button.'
  },
  group: {
    description: 'Determines whether or not the buttons are grouped.'
  }
}
</script>
