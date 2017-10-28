<template>
  <div class="uk-padding">

    <vk-button
      @click="show.center = true"
      v-text="'Center'"
    ></vk-button>

    <vk-button
      @click="show.withScrollbar = true"
      v-text="'With Scrollbar'"
    ></vk-button>

    <vk-modal
      center
      :show.sync="show.center"
    >
      <p>{{ lorem }}</p>
    </vk-modal>

    <vk-modal
      center
      :show.sync="show.withScrollbar"
    >
      <p v-for="n in 10">{{ lorem }}</p>
    </vk-modal>

  </div>
</template>

<script>
export default {
  data: () => ({
    show: {
      center: false,
      withScrollbar: false
    },
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
}
</script>
