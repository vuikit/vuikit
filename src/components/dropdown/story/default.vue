<template>
  <div class="uk-padding">
    <div class="uk-inline">
      <vk-button>Hover</vk-button>
      <vk-dropdown
        :show="hover"
        @mouseenter="hover = true"
        @mouseleave="({ delay }) => delay(800, () => {
          hover = false
        })">
        <div v-html="content" />
      </vk-dropdown>
    </div>
    <div class="uk-inline">
      <vk-button>Click</vk-button>
      <vk-dropdown
        :show="click"
        @click-out="click = false"
        @click-target="click = !click">
        <div v-html="content" />
      </vk-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    hover: false,
    click: false,
    content: `
      <ul class="uk-nav uk-dropdown-nav">
        <li class="uk-active"><a href="#">Active</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
      </ul>
    `
  })
}
</script>
