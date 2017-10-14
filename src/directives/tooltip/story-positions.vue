<template>
  <div class="uk-padding">
    <div class="uk-section uk-text-center">
      <div class="uk-flex uk-flex-center uk-flex-middle uk-margin">
        <vk-button v-tooltip:top-left="'top-left'">top-left</vk-button>
        <vk-button v-tooltip:top="'top'">top</vk-button>
        <vk-button v-tooltip:top-right="'top-right'">top-right</vk-button>
      </div>
      <div class="uk-flex uk-flex-center uk-flex-middle uk-margin">
        <vk-button v-tooltip:left="'left'">left</vk-button>
        <vk-button v-tooltip:right="'right'">right</vk-button>
      </div>
      <div class="uk-flex uk-flex-center uk-flex-middle uk-margin">
        <vk-button v-tooltip:bottom-left="'bottom-left'">bottom-left</vk-button>
        <vk-button v-tooltip:bottom="'bottom'">bottom</vk-button>
        <vk-button v-tooltip:bottom-right="'bottom-right'">bottom-right</vk-button>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from './'

export default {
  directives: {
    Tooltip
  }
}
</script>
