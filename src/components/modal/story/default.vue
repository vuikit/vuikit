<template>
  <div class="uk-padding">

    <vk-button
      @click="show.default = true"
      v-text="'Default'"
    ></vk-button>

    <vk-button
      @click="show.sections = true"
      v-text="'Sections'"
    ></vk-button>

    <vk-button
      @click="show.closeOutside = true"
      v-text="'Close Outside'"
    ></vk-button>

    <vk-modal
      :show.sync="show.default"
    >
      <h2 class="uk-modal-title">Headline</h2>
      <p>{{ lorem }}</p>
      <div class="uk-text-right">
        <vk-button @click="show.default = false">Cancel</vk-button>
        <vk-button type="primary">Save</vk-button>
      </div>
    </vk-modal>

    <vk-modal
      :show.sync="show.sections"
    >
      <h2 class="uk-modal-title">Headline</h2>
      <p>{{ lorem }}</p>
      <div slot="footer" class="uk-text-right">
        <vk-button @click="show.sections = false">Cancel</vk-button>
        <vk-button type="primary">Save</vk-button>
      </div>
    </vk-modal>

    <vk-modal
      close-btn="outside"
      :show.sync="show.closeOutside"
    >
      <p>{{ lorem }}</p>
    </vk-modal>

  </div>
</template>

<script>
export default {
  data: () => ({
    show: {
      default: false,
      sections: false,
      closeOutside: false
    },
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
}
</script>
