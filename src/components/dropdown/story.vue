<template>
  <div class="uk-padding">
    <vk-button>
      Hover
    </vk-button>
    <vk-dropdown
      :show="show1"
      @mouseenter="show1 = true"
      @mouseleave="show1 = false"
      @click-out="show1 = false"
    >
      {{ lorem }}
    </vk-dropdown>

    <vk-button
      @click="show2 = !show2"
    >
      Click
    </vk-button>
    <vk-dropdown
      :show="show2"
    >
      {{ lorem }}
    </vk-dropdown>
  </div>
</template>

<script>
export default {
  data: () => ({
    show1: false,
    show2: false,
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
  })
}
</script>
