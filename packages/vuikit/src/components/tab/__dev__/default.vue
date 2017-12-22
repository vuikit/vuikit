<template>
  <div class="uk-padding">

    <h2>Default</h2>

    <vk-tab :active-tab.sync="activeTab">
      <vk-tab-item label="Item" name="tab-1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Item" name="tab-2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" name="tab-3" disabled />
    </vk-tab>

    <h2>Alignment</h2>

    <vk-tab alignment="center" :active-tab.sync="activeTab">
      <vk-tab-item label="Left" name="tab-1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Item" name="tab-2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" name="tab-3" disabled />
    </vk-tab>

    <vk-tab alignment="right" :active-tab.sync="activeTab">
      <vk-tab-item label="Right" name="tab-1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Item" name="tab-2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" name="tab-3" disabled />
    </vk-tab>

    <vk-tab alignment="justify" :active-tab.sync="activeTab">
      <vk-tab-item label="Justify" name="tab-1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Item" name="tab-2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" name="tab-3" disabled />
    </vk-tab>

  </div>
</template>

<script>
import { Tab as VkTab, TabItem as VkTabItem } from '../'

export default {
  components: {
    VkTab,
    VkTabItem
  },
  data: () => ({
    activeTab: ''
  })
}
</script>
