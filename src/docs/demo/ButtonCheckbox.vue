<template>
  <div>
    <div class="uk-margin-large">
      <vk-button-checkbox
        :type="api.type"
        :group.sync="api.group"
        :value.sync="api.value">
        <vk-button value="1">Button 1</vk-button>
        <vk-button value="2">Button 2</vk-button>
        <vk-button value="3">Button 3</vk-button>
      </vk-button-checkbox>
    </div>
    <vk-tab-horizontal>
      <vk-tab title="Props">
        <api-props-table :rows="apiPropsRows" :values="$data.api"></api-props-table>
      </vk-tab>
      <vk-tab title="Events">
        <api-events-table :rows="apiEventsRows"></api-events-table>
      </vk-tab>
    </vk-tab-horizontal>
  </div>
</template>

<script>
import * as Helper from '../helper'
import { merge } from 'lodash'

export default {
  data: () => ({
    api: Helper.getComponentPropsDefaults('ButtonCheckbox')
  }),
  computed: {
    apiPropsRows: function () {
      return merge({}, Helper.getComponentProps('ButtonCheckbox'), apiPropsInfo)
    },
    apiEventsRows: function () {
      return apiEventsInfo
    }
  }
}

const apiPropsInfo = {
  value: {
    description: 'The current value determined by the active button.'
  },
  group: {
    description: 'Determines whether or not the buttons are grouped.'
  }
}

const apiEventsInfo = [{
  name: 'change',
  description: 'Emited when there was made some selection change.'
}]
</script>
