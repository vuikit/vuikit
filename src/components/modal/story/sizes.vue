<template>
  <div class="uk-padding">
    <vk-button
      @click="show.container = true"
      v-text="'Container'"
    ></vk-button>

    <vk-button
      @click="show.expand = true"
      v-text="'Expand'"
    ></vk-button>

    <vk-button
      @click="show.widths = true"
      v-text="'Widths'"
    ></vk-button>

    <vk-button
      @click="show.full = true"
      v-text="'Full'"
    ></vk-button>

    <vk-modal container
      :show.sync="show.container"
    >
      <p>{{ lorem }}</p>
    </vk-modal>

    <vk-modal
      width="1-1"
      :show.sync="show.expand"
    >
      <p>{{ lorem }}</p>
    </vk-modal>

    <vk-modal
      width="3-4@m 2-3@l 1-2@xl"
      :show.sync="show.widths"
    >
      <p>{{ lorem }}</p>
    </vk-modal>

    <vk-modal-full
      :show.sync="show.full"
      close-btn="large"
    >
      <div class="uk-width-xxlarge uk-padding-large">
        <h1>Headline</h1>
        <p>{{ lorem }}</p>
      </div>
    </vk-modal-full>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: {
      container: false,
      expand: false,
      widths: false,
      full: false
    },
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
}
</script>
