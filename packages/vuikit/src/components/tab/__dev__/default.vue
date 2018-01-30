<template>
  <div class="uk-padding">

    <h2>Default</h2>

    <vk-tab>
      <vk-tab-item label="Item">
        Content
      </vk-tab-item>
      <vk-tab-item label="Item">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" disabled />
    </vk-tab>

    <h2>Sync Active Tab</h2>

    <vk-tab :active-tab.sync="activeTab">
      <vk-tab-item label="Item" name="tab-1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Item" name="tab-2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" disabled />
    </vk-tab>

    <hr />
    Current Tab: {{ activeTab }}
    <button @click="activeTab = 'tab-1'">reset</button>

    <h2>Alignment</h2>

    <vk-tab alignment="center">
      <vk-tab-item label="Center">
        Content
      </vk-tab-item>
      <vk-tab-item label="Item">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" disabled />
    </vk-tab>

    <vk-tab alignment="right">
      <vk-tab-item label="Right">
        Content
      </vk-tab-item>
      <vk-tab-item label="Item">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" disabled />
    </vk-tab>

    <vk-tab alignment="justify">
      <vk-tab-item label="Justify">
        Content
      </vk-tab-item>
      <vk-tab-item label="Item">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" disabled />
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
