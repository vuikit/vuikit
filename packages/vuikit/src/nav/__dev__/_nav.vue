<template>
  <vk-nav :center="center" :type="type">
    <vk-nav-item-header title="Header"/>
    <vk-nav-item href="#" title="Item"/>
    <vk-nav-item href="#" title="Active" active/>
    <vk-nav-item href="#" icon="thumbnails" title="Icon"/>
    <vk-nav-item href="#" :icon="$options.icon"/>
    <vk-nav-item-divider/>
    <vk-nav-item-parent href="#" title="Parent">
      <vk-nav-item href="#" title="Sub Item"/>
      <vk-nav-item-parent href="#" title="Sub item">
        <vk-nav-item href="#" title="Sub Item"/>
        <vk-nav-item href="#" title="Sub Item"/>
      </vk-nav-item-parent>
    </vk-nav-item-parent>
    <vk-nav-item-parent href="#" title="Parent">
      <vk-nav-item href="#" title="Sub Item"/>
      <vk-nav-item href="#" title="Sub Item"/>
    </vk-nav-item-parent>
  </vk-nav>
</template>

<script>
import IconTrash from '@vuikit/icons/lib/trash'

export default {
  icon: IconTrash,
  props: ['center', 'type']
}
</script>
