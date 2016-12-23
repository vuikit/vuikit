<template>
  <div>
    <div class="uk-margin-large">
      Tabs header layout can be customized setting the <code>header</code>
      <a href="https://vuejs.org/v2/guide/components.html#Scoped-Slots">Scoped Slot</a>
      in the tab declaration.
    </div>
    <div class="uk-margin-large">
      <vk-tabs
        :activeTab="activeTab"
        @change="tab => { activeTab = tab }">
        <vk-tab>
          <template slot="header">
            <i class="uk-icon-home"></i> Home
          </template>
          Home
        </vk-tab>
        <vk-tab>
          <template slot="header">
            <i class="uk-icon-user"></i> User
          </template>
          User
        </vk-tab>
        <vk-tab>
          <template slot="header">
            <i class="uk-icon-cog"></i>
          </template>
          Configuration
        </vk-tab>
        <vk-tab disabled>
          <template slot="header">
            <i class="uk-icon-exclamation-triangle"></i> Forbidden
          </template>
        </vk-tab>
      </vk-tabs>
    </div>
    <vk-docs-code>{{ code }}</vk-docs-code>
  </div>
</template>

<script>
import mixin from '../_mixin'

export default {
  mixins: [mixin],
  data: () => ({
    activeTab: 1,
    example
  })
}

const example =
`<vk-tabs
  :activeTab="activeTab"
  @change="tab => { activeTab = tab }">
  <vk-tab>
    <template slot="header">
      <i class="uk-icon-home"></i> Home
    </template>
    Home
  </vk-tab>
  <vk-tab>
    <template slot="header">
      <i class="uk-icon-user"></i> User
    </template>
    User
  </vk-tab>
  <vk-tab>
    <template slot="header">
      <i class="uk-icon-cog"></i>
    </template>
    Configuration
  </vk-tab>
  <vk-tab disabled>
    <template slot="header">
      <i class="uk-icon-exclamation-triangle"></i> Forbidden
    </template>
  </vk-tab>
</vk-tabs>`
</script>
