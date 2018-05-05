<template>
  <div class="uk-padding">

    <h1>Modal Full</h1>

    <vk-modal-full
      :show.sync="full"
      @keyup.esc="full = false"
    >
      <vk-modal-full-close large></vk-modal-full-close>
      <div class="uk-width-xxlarge uk-padding-large">
        <h1>Headline</h1>
        <p>{{ lorem }}</p>
      </div>
    </vk-modal-full>

    <vk-modal-full
      :show.sync="fullSplit"
      @keyup.esc="fullSplit = false"
    >
      <vk-modal-full-close></vk-modal-full-close>
      <vk-grid class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle">
        <div class="uk-background-cover" style="background-image: url('/photo.jpg');" v-vk-height-viewport></div>
        <div class="uk-padding-large">
          <h1>Headline</h1>
          <p>{{ lorem }}</p>
        </div>
      </vk-grid>
    </vk-modal-full>

  </div>
</template>

<script>
export default {
  data: () => ({
    full: false,
    fullSplit: false,
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
}
</script>
