<template>
  <div class="uk-padding">

    <h1>Tabs Vertical</h1>

    <vk-grid class="uk-child-width-1-3@m">
      <div>
        <h2>Default</h2>

        <vk-tabs-vertical>
          <vk-tabs-item title="Item">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item">
            Other content
          </vk-tabs-item>
          <vk-tabs-item title="Disabled" disabled />
        </vk-tabs-vertical>
      </div>

      <div>
        <h2>Animation</h2>

        <vk-tabs-vertical animation="fade">
          <vk-tabs-item title="Item">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item" key="second">
            Other content
          </vk-tabs-item>
        </vk-tabs-vertical>
      </div>
      <div>
        <h2>Sync Active Tab</h2>

        <vk-tabs-vertical :active-tab.sync="activeTab">
          <vk-tabs-item title="Item" key="tab-1">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item" key="tab-2">
            Other content
          </vk-tabs-item>
        </vk-tabs-vertical>
        <p>Current Tab: {{ activeTab }}</p>
        <vk-button size="small" @click="activeTab = 'tab-1'">Set Tab 1</vk-button>
      </div>
    </vk-grid>

    <h2>Alignment</h2>

    <vk-grid class="uk-child-width-1-3@m">
      <div>
        <vk-tabs-vertical alignment="left">
          <vk-tabs-item title="Left">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item">
            Other content
          </vk-tabs-item>
        </vk-tabs-vertical>
      </div>
      <div>
        <vk-tabs-vertical alignment="right">
          <vk-tabs-item title="Right">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item">
            Other content
          </vk-tabs-item>
        </vk-tabs-vertical>
      </div>
    </vk-grid>

    <h2>Keep Alive</h2>

    <vk-tabs animation="fade" keep-alive>
      <vk-tabs-item title="Item">
        <vk-subnav>
          <vk-subnav-item title="Option"></vk-subnav-item>
          <vk-subnav-item title="Option"></vk-subnav-item>
        </vk-subnav>
      </vk-tabs-item>
      <vk-tabs-item title="Item" key="second">
        <vk-subnav>
          <vk-subnav-item title="Option"></vk-subnav-item>
          <vk-subnav-item title="Option"></vk-subnav-item>
        </vk-subnav>
      </vk-tabs-item>
    </vk-tabs>

  </div>
</template>

<script>
export default {
  data: () => ({
    activeTab: 'tab-2'
  })
}
</script>
