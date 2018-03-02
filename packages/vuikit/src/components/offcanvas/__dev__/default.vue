<template>
  <vk-offcanvas-content>
    <div class="uk-padding">

      <h1>Offcanvas</h1>

      <div v-vk-margin>
        <vk-button @click="slide = true">Slide</vk-button>
        <vk-button @click="push = true">Push</vk-button>
        <vk-button @click="reveal = true">Reveal</vk-button>
        <vk-button @click="none = true">None</vk-button>
      </div>

      <h2>Options</h2>

      <vk-button @click="flipped = !flipped">Flipped ({{ flipped }})</vk-button>
      <vk-button @click="overlay = !overlay">Overlay ({{ overlay }})</vk-button>

      <vk-offcanvas
        mode="none"
        :flipped="flipped"
        :overlay="overlay"
        :show.sync="none"
        @keyup.esc="none = false"
      >
        <vk-offcanvas-bar class="uk-flex uk-flex-column uk-text-center">
          <vk-offcanvas-close large @click="none = false" />
          <demo-nav />
          <demo-icons />
        </vk-offcanvas-bar>
      </vk-offcanvas>

      <vk-offcanvas
        mode="reveal"
        :flipped="flipped"
        :overlay="overlay"
        :show.sync="reveal"
        @keyup.esc="reveal = false"
      >
        <vk-offcanvas-bar class="uk-flex uk-flex-column uk-text-center">
          <vk-offcanvas-close large @click="reveal = false" />
          <demo-nav />
          <demo-icons />
        </vk-offcanvas-bar>
      </vk-offcanvas>

      <vk-offcanvas
        mode="push"
        :flipped="flipped"
        :overlay="overlay"
        :show.sync="push"
        @keyup.esc="push = false"
      >
        <vk-offcanvas-bar class="uk-flex uk-flex-column uk-text-center">
          <vk-offcanvas-close large @click="push = false" />
          <demo-nav />
          <demo-icons />
        </vk-offcanvas-bar>
      </vk-offcanvas>

      <vk-offcanvas
        mode="slide"
        :flipped="flipped"
        :overlay="overlay"
        :show.sync="slide"
        @keyup.esc="slide = false"
      >
        <vk-offcanvas-bar class="uk-flex uk-flex-column uk-text-center">
          <vk-offcanvas-close large @click="slide = false" />
          <demo-nav />
          <demo-icons />
        </vk-offcanvas-bar>
      </vk-offcanvas>

      <p v-for="n in 10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

    </div>
  </vk-offcanvas-content>
</template>

<script>
import DemoNav from './_nav'
import DemoIcons from './_icons'

export default {
  components: {
    DemoNav,
    DemoIcons
  },
  data: () => ({
    none: false,
    push: false,
    reveal: false,
    slide: false,
    flipped: false,
    overlay: true
  })
}
</script>
