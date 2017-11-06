<template>
  <div class="uk-padding">

    <h2>Default</h2>

    <vk-tab-vertical :active-tab.sync="activeTab">
      <vk-tab-item label="Tab 1" name="tab-1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Tab 2" name="tab-2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" name="tab-3" disabled />
    </vk-tab-vertical>

    <h2>Alignment</h2>

    <vk-tab-vertical alignment="left" :active-tab.sync="activeTab">
      <vk-tab-item label="Tab 1" name="tab-1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Tab 2" name="tab-2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" name="tab-3" disabled />
    </vk-tab-vertical>

    <vk-tab-vertical alignment="right" :active-tab.sync="activeTab">
      <vk-tab-item label="Tab 1" name="tab-1">
        Content
      </vk-tab-item>
      <vk-tab-item label="Tab 2" name="tab-2">
        Other content
      </vk-tab-item>
      <vk-tab-item label="Disabled" name="tab-3" disabled />
    </vk-tab-vertical>

  </div>
</template>

<script>
export default {
  data: () => ({
    activeTab: ''
  })
}
</script>
