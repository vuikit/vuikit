<template>
  <div class="uk-padding">

    <h1>Subnav</h1>

    <vk-grid class="uk-child-width-1-2@m">
      <div>

        <vk-subnav v-vk-margin>
          <vk-subnav-item title="Item"></vk-subnav-item>
          <vk-subnav-item title="Item"></vk-subnav-item>
          <vk-subnav-item title="Item"></vk-subnav-item>
          <vk-subnav-item title="Disabled" disabled></vk-subnav-item>
        </vk-subnav>

        <h2>Divider</h2>

        <vk-subnav divided v-vk-margin>
          <vk-subnav-item title="Item"></vk-subnav-item>
          <vk-subnav-item title="Item"></vk-subnav-item>
          <vk-subnav-item title="Item"></vk-subnav-item>
          <vk-subnav-item title="Disabled" disabled></vk-subnav-item>
        </vk-subnav>

        <h2>Pill</h2>

        <vk-subnav pill v-vk-margin>
          <vk-subnav-item title="Item"></vk-subnav-item>
          <vk-subnav-item title="Item"></vk-subnav-item>
          <vk-subnav-item title="Item"></vk-subnav-item>
          <vk-subnav-item title="Disabled" disabled></vk-subnav-item>
        </vk-subnav>

      </div>
      <div>

        <h2>Dropdown</h2>

        <vk-subnav pill v-vk-margin>
          <vk-subnav-item-dropdown title="Click">
            <vk-nav-dropdown>
              <vk-nav-item href="#" title="Active" active></vk-nav-item>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
              <vk-nav-item-header title="Header"></vk-nav-item-header>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
              <vk-nav-item-divider></vk-nav-item-divider>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
            </vk-nav-dropdown>
          </vk-subnav-item-dropdown>
          <vk-subnav-item-dropdown title="Hover" mode="hover">
            <vk-nav-dropdown>
              <vk-nav-item href="#" title="Active" active></vk-nav-item>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
              <vk-nav-item-header title="Header"></vk-nav-item-header>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
              <vk-nav-item-divider></vk-nav-item-divider>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
            </vk-nav-dropdown>
          </vk-subnav-item-dropdown>
          <vk-subnav-item-dropdown title="Disabled" disabled>
            <vk-nav-dropdown>
              <vk-nav-item href="#" title="Active" active></vk-nav-item>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
              <vk-nav-item-header title="Header"></vk-nav-item-header>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
              <vk-nav-item-divider></vk-nav-item-divider>
              <vk-nav-item href="#" title="Item"></vk-nav-item>
            </vk-nav-dropdown>
          </vk-subnav-item-dropdown>
        </vk-subnav>

        <h2>Sync Active Item</h2>

        <vk-subnav v-vk-margin :active-item.sync="active">
          <vk-subnav-item title="Item" key="first"></vk-subnav-item>
          <vk-subnav-item title="Item"></vk-subnav-item>
          <vk-subnav-item title="Item" key="third"></vk-subnav-item>
          <vk-subnav-item title="Disabled" disabled></vk-subnav-item>
        </vk-subnav>

        <p>Active: {{ active }}</p>

        <vk-button size="small" @click="active = 'first'">Set First</vk-button>

      </div>
    </vk-grid>

  </div>
</template>

<script>
export default {
  data: () => ({
    active: 'third'
  })
}
</script>
