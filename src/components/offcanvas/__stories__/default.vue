<template>
  <vk-offcanvas-content>
    <div class="uk-padding">

      <h2>Default</h2>
      <div class="uk-grid uk-grid-small uk-child-width-auto uk-flex-between">
        <div>
          <vk-button @click="transition = 'none'; flip = false; overlay = false; show = true">None</vk-button>
          <vk-button @click="transition = 'slide'; flip = false; overlay = false; show = true">Slide</vk-button>
          <vk-button @click="transition = 'push'; flip = false; overlay = false; show = true">Push</vk-button>
          <vk-button @click="transition = 'reveal'; flip = false; overlay = false; show = true">Reveal</vk-button>
        </div>
        <div>
          <vk-button @click="transition = 'none'; flip = true; overlay = false; show = true">None</vk-button>
          <vk-button @click="transition = 'slide'; flip = true; overlay = false; show = true">Slide</vk-button>
          <vk-button @click="transition = 'push'; flip = true; overlay = false; show = true">Push</vk-button>
          <vk-button @click="transition = 'reveal'; flip = true; overlay = false; show = true">Reveal</vk-button>
        </div>
      </div>

      <h2>Overlay</h2>
      <div class="uk-grid uk-grid-small uk-child-width-auto uk-flex-between">
        <div>
          <vk-button @click="transition = 'none'; flip = false; overlay = true; show = true">None</vk-button>
          <vk-button @click="transition = 'slide'; flip = false; overlay = true; show = true">Slide</vk-button>
          <vk-button @click="transition = 'push'; flip = false; overlay = true; show = true">Push</vk-button>
          <vk-button @click="transition = 'reveal'; flip = false; overlay = true; show = true">Reveal</vk-button>
        </div>
        <div>
          <vk-button @click="transition = 'none'; flip = true; overlay = true; show = true">None</vk-button>
          <vk-button @click="transition = 'slide'; flip = true; overlay = true; show = true">Slide</vk-button>
          <vk-button @click="transition = 'push'; flip = true; overlay = true; show = true">Push</vk-button>
          <vk-button @click="transition = 'reveal'; flip = true; overlay = true; show = true">Reveal</vk-button>
        </div>
      </div>

      <vk-offcanvas
        :show.sync="show"
        :flip="flip"
        :overlay="overlay"
        :transition="transition"
      >
        <vk-offcanvas-close @click="show = false" />
      </vk-offcanvas>

      <p v-for="n in 10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

    </div>
  </vk-offcanvas-content>
</template>

<script>
export default {
  data: () => ({
    show: false,
    flip: false,
    overlay: false,
    transition: 'none'
  })
}
</script>
