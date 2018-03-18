<template>
  <div class="uk-padding">

    <h1>Tabs</h1>

    <vk-grid class="uk-child-width-1-3@m">
      <div>
        <h2>Default</h2>

        <vk-tabs>
          <vk-tabs-item title="Item">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item" icon="trash">
            Other content
          </vk-tabs-item>
          <vk-tabs-item title="Disabled" disabled />
        </vk-tabs>
      </div>

      <div>
        <h2>Animation</h2>

        <vk-tabs animation="fade">
          <vk-tabs-item title="Item">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item">
            Other content
          </vk-tabs-item>
        </vk-tabs>
      </div>
      <div>
        <h2>Sync Active Tab</h2>

        <vk-tabs :active-tab.sync="activeTab">
          <vk-tabs-item title="Item" key="tab-1">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item" key="tab-2">
            Other content
          </vk-tabs-item>
        </vk-tabs>
        <p>Current Tab: {{ activeTab }}</p>
        <vk-button size="small" @click="activeTab = 'tab-1'">Set Tab 1</vk-button>
      </div>
    </vk-grid>

    <h2>Alignment</h2>

    <vk-grid class="uk-child-width-1-3@m">
      <div>
        <vk-tabs alignment="center">
          <vk-tabs-item title="Center">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item">
            Other content
          </vk-tabs-item>
        </vk-tabs>
      </div>
      <div>
        <vk-tabs alignment="right">
          <vk-tabs-item title="Right">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item">
            Other content
          </vk-tabs-item>
        </vk-tabs>
      </div>
      <div>
        <vk-tabs alignment="justify">
          <vk-tabs-item title="Justify">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item">
            Other content
          </vk-tabs-item>
        </vk-tabs>
      </div>
    </vk-grid>

    <vk-grid class="uk-child-width-1-2@m">
      <div>
        <h2>Flipped</h2>

        <vk-tabs flipped>
          <vk-tabs-item title="Flipped">
            Content
          </vk-tabs-item>
          <vk-tabs-item title="Item">
            Other content
          </vk-tabs-item>
          <vk-tabs-item title="Disabled" disabled />
        </vk-tabs>
      </div>
      <div>
        <h2>Keep Alive</h2>
        <vk-tabs animation="fade" keep-alive>
          <vk-tabs-item title="Item">
            <vk-subnav>
              <vk-subnav-item title="Option"></vk-subnav-item>
              <vk-subnav-item title="Option"></vk-subnav-item>
            </vk-subnav>
          </vk-tabs-item>
          <vk-tabs-item title="Item">
            <vk-subnav>
              <vk-subnav-item title="Option"></vk-subnav-item>
              <vk-subnav-item title="Option"></vk-subnav-item>
            </vk-subnav>
          </vk-tabs-item>
        </vk-tabs>
      </div>
    </vk-grid>

    <h2>Grouping (experimental)</h2>

    <vk-tabs group>
      <vk-tabs-item title="Item">
        Content
      </vk-tabs-item>
      <vk-tabs-item title="Item" icon="trash">
        Content 2
      </vk-tabs-item>
      <vk-tabs-item title="Item" icon="trash">
        Content 3
      </vk-tabs-item>
      <vk-tabs-item title="Item" icon="trash">
        Content 3
      </vk-tabs-item>
      <vk-tabs-item title="Item" icon="trash">
        Content 3
      </vk-tabs-item>
      <vk-tabs-item title="Item" icon="trash">
        Content 3
      </vk-tabs-item>
      <vk-tabs-item title="Item" icon="trash">
        Content 3
      </vk-tabs-item>
      <vk-tabs-item title="Item" icon="trash">
        Content 3
      </vk-tabs-item>
      <vk-tabs-item title="Item" icon="trash">
        Content 4
      </vk-tabs-item>
      <vk-tabs-item title="Disabled" disabled />
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
