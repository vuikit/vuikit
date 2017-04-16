<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
    <div class="uk-child-width-1-4@m" uk-grid>
      <div class="uk-width-1-2@m">
        <h2>Top</h2>
        <vk-tabs
          :activeTab="activeTab"
          @change="tab => {
            activeTab = tab
          }">
          <vk-tab label="LEFT">Content 1</vk-tab>
          <vk-tab label="ITEM">Content 2</vk-tab>
          <vk-tab label="ITEM">Content 3</vk-tab>
          <vk-tab label="ITEM">Content 4</vk-tab>
          <vk-tab label="ITEM">Content 5</vk-tab>
          <vk-tab disabled label="DISABLED" />
        </vk-tabs>
        <vk-tabs
          :activeTab="activeTab"
          alignment="right"
          @change="tab => {
            activeTab = tab
          }">
          <vk-tab label="RIGHT">Content 1</vk-tab>
          <vk-tab label="ITEM">Content 2</vk-tab>
          <vk-tab label="ITEM">Content 3</vk-tab>
          <vk-tab label="ITEM">Content 4</vk-tab>
          <vk-tab label="ITEM">Content 5</vk-tab>
          <vk-tab disabled label="DISABLED" />
        </vk-tabs>
        <vk-tabs
          :activeTab="activeTab"
          alignment="center"
          @change="tab => {
            activeTab = tab
          }">
          <vk-tab label="CENTER">Content 1</vk-tab>
          <vk-tab label="ITEM">Content 2</vk-tab>
          <vk-tab label="ITEM">Content 3</vk-tab>
          <vk-tab label="ITEM">Content 4</vk-tab>
          <vk-tab label="ITEM">Content 5</vk-tab>
          <vk-tab disabled label="DISABLED" />
        </vk-tabs>
        <vk-tabs
          :activeTab="activeTab"
          alignment="justify"
          @change="tab => {
            activeTab = tab
          }">
          <vk-tab label="JUSTIFY">Content 1</vk-tab>
          <vk-tab label="ITEM">Content 2</vk-tab>
          <vk-tab label="ITEM">Content 3</vk-tab>
          <vk-tab label="ITEM">Content 4</vk-tab>
          <vk-tab label="ITEM">Content 5</vk-tab>
        </vk-tabs>
      </div>
      <div class="uk-width-1-2@m">
        <h2>Bottom</h2>
        <vk-tabs
          bottom
          :activeTab="activeTab"
          @change="tab => {
            activeTab = tab
          }">
          <vk-tab label="LEFT">Content 1</vk-tab>
          <vk-tab label="ITEM">Content 2</vk-tab>
          <vk-tab label="ITEM">Content 3</vk-tab>
          <vk-tab label="ITEM">Content 4</vk-tab>
          <vk-tab label="ITEM">Content 5</vk-tab>
          <vk-tab disabled label="DISABLED" />
        </vk-tabs>
        <vk-tabs
          bottom
          :activeTab="activeTab"
          alignment="right"
          @change="tab => {
            activeTab = tab
          }">
          <vk-tab label="RIGHT">Content 1</vk-tab>
          <vk-tab label="ITEM">Content 2</vk-tab>
          <vk-tab label="ITEM">Content 3</vk-tab>
          <vk-tab label="ITEM">Content 4</vk-tab>
          <vk-tab label="ITEM">Content 5</vk-tab>
          <vk-tab disabled label="DISABLED" />
        </vk-tabs>
        <vk-tabs
          bottom
          :activeTab="activeTab"
          alignment="center"
          @change="tab => {
            activeTab = tab
          }">
          <vk-tab label="CENTER">Content 1</vk-tab>
          <vk-tab label="ITEM">Content 2</vk-tab>
          <vk-tab label="ITEM">Content 3</vk-tab>
          <vk-tab label="ITEM">Content 4</vk-tab>
          <vk-tab label="ITEM">Content 5</vk-tab>
          <vk-tab disabled label="DISABLED" />
        </vk-tabs>
        <vk-tabs
          bottom
          :activeTab="activeTab"
          alignment="justify"
          @change="tab => {
            activeTab = tab
          }">
          <vk-tab label="JUSTIFY">Content 1</vk-tab>
          <vk-tab label="ITEM">Content 2</vk-tab>
          <vk-tab label="ITEM">Content 3</vk-tab>
          <vk-tab label="ITEM">Content 4</vk-tab>
          <vk-tab label="ITEM">Content 5</vk-tab>
        </vk-tabs>
      </div>
    </div>
    <h2>Tabs Vertical</h2>
    <div class="uk-child-width-1-4@m" uk-grid>
      <div class="uk-width-1-2@m">
        <vk-tabs-vertical
          :activeTab="activeTab"
          @change="tab => {
            activeTab = tab
          }">
          <vk-tab label="ITEM">Content 1</vk-tab>
          <vk-tab label="ITEM">Content 2</vk-tab>
          <vk-tab label="ITEM">Content 3</vk-tab>
          <vk-tab label="ITEM">Content 4</vk-tab>
          <vk-tab label="ITEM">Content 5</vk-tab>
          <vk-tab disabled label="DISABLED" />
        </vk-tabs-vertical>
      </div>
      <div class="uk-width-1-2@m">
        <vk-tabs-vertical
          :activeTab="activeTab"
          alignment="right"
          @change="tab => {
            activeTab = tab
          }">
          <vk-tab label="ITEM">Content 1</vk-tab>
          <vk-tab label="ITEM">Content 2</vk-tab>
          <vk-tab label="ITEM">Content 3</vk-tab>
          <vk-tab label="ITEM">Content 4</vk-tab>
          <vk-tab label="ITEM">Content 5</vk-tab>
          <vk-tab disabled label="DISABLED" />
        </vk-tabs-vertical>
      </div>
    </div>
    <h2>Dynamic Tabs</h2>
    <div class="uk-child-width-1-4@m" uk-grid>
      <div class="uk-width-1-2@m">
        <vk-tabs
          :activeTab="dynamic.activeTab"
          @change="tab => {
            dynamic.activeTab = tab
          }">
          <vk-tab v-for="({ label, content, disabled }, index) in dynamic.tabs"
            :key="index"
            :label="label"
            :disabled="disabled">
            {{ content }}
          </vk-tab>
        </vk-tabs>
      </div>
      <div class="uk-width-1-2@m">
        <vk-tabs-vertical
          :activeTab="dynamic.activeTab"
          @change="tab => {
            dynamic.activeTab = tab
          }">
          <vk-tab v-for="({ label, content, disabled }, index) in dynamic.tabs"
            :key="index"
            :label="label"
            :disabled="disabled">
            {{ content }}
          </vk-tab>
        </vk-tabs-vertical>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    activeTab: 1,
    dynamic: {
      activeTab: 1,
      tabs: [
        { label: 'Item', content: 'content 1' },
        { label: 'Item', content: 'content 2' },
        { label: 'Item', content: 'content 3' },
        { label: 'Item', content: 'content 4' },
        { label: 'Item', content: 'content 5' },
        { label: 'Disabled', disabled: true }
      ]
    }
  })
}
</script>
