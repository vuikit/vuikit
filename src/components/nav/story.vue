<template>
  <div class="uk-padding">

    <h2>Default</h2>

    <vk-nav>
      <vk-nav-item label="Active" active />
      <vk-nav-item-parent label="Parent">
        <vk-nav-item label="Sub item" />
        <vk-nav-item label="Sub item" />
      </vk-nav-item-parent>
      <vk-nav-item-header label="Header" />
      <vk-nav-item label="Item" icon="table" />
      <vk-nav-item label="Item" icon="thumbnails" />
      <vk-nav-item-divider />
      <vk-nav-item label="Item" icon="trash" />
    </vk-nav>

    <h2>Nested Navs</h2>

    <vk-nav>
      <vk-nav-item label="Active" active />
      <vk-nav-item-parent label="Parent">
        <vk-nav-item label="Sub item" />
        <vk-nav-item-parent label="Sub item">
          <vk-nav-item label="Sub item" />
          <vk-nav-item label="Sub item" />
        </vk-nav-item-parent>
      </vk-nav-item-parent>
    </vk-nav>

    <!-- <h2>Accordion</h2>

    NOTE: requires JS integration

    <vk-nav>
      <vk-nav-item label="Active" active />
      <vk-nav-item-parent label="Parent">
        <vk-nav-item label="Sub item" />
        <vk-nav-item-parent label="Sub Item">
          <vk-nav-item label="Sub item" />
          <vk-nav-item label="Sub item" />
        </vk-nav-item-parent>
      </vk-nav-item-parent>
      <vk-nav-item-parent label="Parent">
        <vk-nav-item label="Sub item" />
        <vk-nav-item label="Sub Item" />
      </vk-nav-item-parent>
    </vk-nav> -->

    <h2>Center</h2>

    <div class="uk-card uk-card-default uk-card-body uk-width-1-2@s">
      <vk-nav center>
        <vk-nav-item label="Active" active />
        <vk-nav-item label="Item" />
        <vk-nav-item label="Item" />
      </vk-nav>
    </div>

  </div>
</template>
