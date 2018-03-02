<template>
  <div class="uk-padding">

    <h1>Label</h1>

    <p><vk-label>Default</vk-label> <lorem-ipsum /></p>

    <p><vk-label type="success">Success</vk-label> <lorem-ipsum /></p>

    <p><vk-label type="warning">Warning</vk-label> <lorem-ipsum /></p>

    <p><vk-label type="danger">Danger</vk-label> <lorem-ipsum /></p>

  </div>
</template>

<script>
export default {
  components: {
    LoremIpsum: {
      funtional: true,
      render: h => h('span', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    }
  }
}
</script>
