<template>
  <div>

    <vk-container>

      <h1>Container</h1>

      <div class="uk-margin uk-column-1-2@s uk-column-1-3@m uk-text-justify">
        <lorem/>
        <lorem/>
        <lorem/>
      </div>

    </vk-container>

    <vk-container size="small">

      <h1>Small</h1>

      <div class="uk-margin uk-column-1-2@s uk-text-justify">
        <lorem/>
        <lorem/>
        <lorem/>
      </div>

    </vk-container>

    <vk-container size="expand">

      <h1>Expand</h1>

      <div class="uk-margin uk-column-1-2@s uk-column-1-3@m uk-column-1-4@l uk-text-justify">
        <lorem/>
        <lorem/>
        <lorem/>
      </div>

    </vk-container>

  </div>
</template>

<script>
export default {
  components: {
    lorem: {
      functional: true,
      render (h) {
        return h('div', [
          h('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
        ])
      }
    }
  }
}
</script>
