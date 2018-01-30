<template>
  <div class="uk-padding">

    <h2>Default</h2>

    <vk-tab-vertical>
      <vk-tab-item label="Tab 1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Tab 2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" disabled />
    </vk-tab-vertical>

    <h2>Alignment</h2>

    <vk-tab-vertical alignment="left">
      <vk-tab-item label="Tab 1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Tab 2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" disabled />
    </vk-tab-vertical>

    <vk-tab-vertical alignment="right">
      <vk-tab-item label="Tab 1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Tab 2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" disabled />
    </vk-tab-vertical>

  </div>
</template>

<script>
import { TabVertical as VkTabVertical, TabItem as VkTabItem } from '../'

export default {
  components: {
    VkTabItem,
    VkTabVertical
  }
}
</script>
