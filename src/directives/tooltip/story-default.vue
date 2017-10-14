<template>
  <div class="uk-padding">
    <div class="uk-section">
      <vk-button v-tooltip="content">Default</vk-button>
      <vk-button v-tooltip:bottom="content">Position as Arg</vk-button>
      <vk-button v-tooltip="{ position: 'bottom-left', content }">Position as value</vk-button>
      <vk-button v-tooltip="{ delay: 300, content }">Delay</vk-button>
    </div>
    <div class="uk-section">
      <a @click="content = 'content changed'">
        Change Content
      </a>

      {{ content }}
    </div>
  </div>
</template>

<script>
import Tooltip from './'

export default {
  directives: {
    Tooltip
  },
  data: () => ({
    content: 'Content'
  })
}
</script>
