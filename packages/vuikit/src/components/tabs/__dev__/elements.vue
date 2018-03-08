<template>
  <div class="uk-padding">

    <h1>Tabs</h1>

    <h2>Align</h2>

    <vk-grid class="uk-child-width-1-3@m">
      <div>
        <vk-element-tabs>
          <vk-element-tabs-item title="Left (default)" active />
          <vk-element-tabs-item title="Item" />
        </vk-element-tabs>
      </div>
      <div>
        <vk-element-tabs align="center">
          <vk-element-tabs-item title="Center" active />
          <vk-element-tabs-item title="Item" />
        </vk-element-tabs>
      </div>
      <div>
        <vk-element-tabs align="right">
          <vk-element-tabs-item title="Right" active />
          <vk-element-tabs-item title="Item" />
        </vk-element-tabs>
      </div>
    </vk-grid>

    <vk-grid class="uk-child-width-1-2@m">
      <div>
        <vk-element-tabs-vertical>
          <vk-element-tabs-item title="Left (default)" active />
          <vk-element-tabs-item title="Item" />
        </vk-element-tabs-vertical>
      </div>
      <div>
        <vk-element-tabs-vertical align="right">
          <vk-element-tabs-item title="Right" active />
          <vk-element-tabs-item title="Item" />
        </vk-element-tabs-vertical>
      </div>
    </vk-grid>

  </div>
</template>

<script>
export default {
  data: () => ({
    activeTab: 'tab-2'
  })
}
</script>
