<template>
  <div class="uk-padding">
    <vk-button
      @click="show.scrollbar = true"
      v-text="'Scrollbar'"
    ></vk-button>

    <vk-button
      @click="show.overflow = true"
      v-text="'Overflow Auto'"
    ></vk-button>

    <vk-modal
      :show.sync="show.scrollbar"
    >
      <p v-for="n in 10">{{ lorem }}</p>
    </vk-modal>

    <vk-modal overflow-auto
      :show.sync="show.overflow"
    >
      <h2 class="uk-modal-title">Headline</h2>
      <p v-for="n in 10">{{ lorem }}</p>
      <div slot="footer" class="uk-text-right">
        <vk-button class="uk-button-default" @click="show.overflow = false">Cancel</vk-button>
        <vk-button class="uk-button-primary">Save</vk-button>
      </div>
    </vk-modal>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: {
      scrollbar: false,
      overflow: false
    },
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
}
</script>
