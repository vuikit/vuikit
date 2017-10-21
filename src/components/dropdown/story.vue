<template>
  <div class="uk-padding">
    <div class="uk-inline">
      <vk-button
        @mouseenter="show1 = true"
        @mouseleave="show1 = false"
      >
        Hover
      </vk-button>
      <vk-dropdown
        :show="show1"
        @mouseleave="show1 = false"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </vk-dropdown>
    </div>

    <div class="uk-inline">
      <vk-button
        @click="show2 = !show2"
      >
        Click
      </vk-button>
      <vk-dropdown
        :show="show2"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </vk-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    show2: false
  })
}
</script>
