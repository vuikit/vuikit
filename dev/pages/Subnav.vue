<template>
  <div>
    <div class="uk-child-width-1-4@m" uk-grid>
      <div class="uk-width-1-2@m">
        <vk-subnav
          :activeItem="activeItem"
          @change="item => { activeItem = item }">
          <vk-subnav-item label="Item" />
          <vk-subnav-item label="Item" />
          <vk-subnav-item label="Item" />
          <vk-subnav-item label="Item" disabled />
        </vk-subnav>
        <h2>Divider</h2>
        <vk-subnav divider
          :activeItem="activeItem"
          @change="item => { activeItem = item }">
          <vk-subnav-item label="Item" />
          <vk-subnav-item label="Item" />
          <vk-subnav-item label="Item" />
          <vk-subnav-item label="Item" disabled />
        </vk-subnav>
        <h2>Pill</h2>
        <vk-subnav pill
          :activeItem="activeItem"
          @change="item => { activeItem = item }">
          <vk-subnav-item label="Item" />
          <vk-subnav-item label="Item" />
          <vk-subnav-item label="Item" />
          <vk-subnav-item label="Item" disabled />
        </vk-subnav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    activeItem: 1
  })
}
</script>
