<template functional>
  <vk-nav :center="props.center" :type="props.type">
    <vk-nav-item href="#" title="Active" active></vk-nav-item>
    <vk-nav-item-parent href="#" title="Parent">
      <vk-nav-item href="#" title="Sub Item"></vk-nav-item>
      <vk-nav-item-parent href="#" title="Sub item">
        <vk-nav-item href="#" title="Sub Item"></vk-nav-item>
        <vk-nav-item href="#" title="Sub Item"></vk-nav-item>
      </vk-nav-item-parent>
    </vk-nav-item-parent>
    <vk-nav-item-parent href="#" title="Parent">
      <vk-nav-item href="#" title="Sub Item"></vk-nav-item>
      <vk-nav-item href="#" title="Sub Item"></vk-nav-item>
    </vk-nav-item-parent>
    <vk-nav-item-header title="Header"></vk-nav-item-header>
    <vk-nav-item href="#" icon="table" title="Item"></vk-nav-item>
    <vk-nav-item href="#" icon="thumbnails" title="Item"></vk-nav-item>
    <vk-nav-item-divider></vk-nav-item-divider>
    <vk-nav-item href="#" icon="trash" title="Item"></vk-nav-item>
  </vk-nav>
</template>

<script>

export default {
  props: ['center', 'type']
}
</script>
