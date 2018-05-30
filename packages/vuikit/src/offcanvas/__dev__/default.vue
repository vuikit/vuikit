<template>
  <vk-offcanvas-content>
    <div class="uk-padding">

      <h1>Offcanvas</h1>

      <vk-grid gutter="small" class="uk-child-width-auto uk-flex-between">
        <div>
          <vk-button @click="overlay = false, flipped = false, show = true">Default</vk-button>
          <vk-button @click="overlay = false, flipped = false, slide = true">Slide</vk-button>
          <vk-button @click="overlay = false, flipped = false, push = true">Push</vk-button>
          <vk-button @click="overlay = false, flipped = false, reveal = true">Reveal</vk-button>
        </div>
        <div>
          <vk-button @click="overlay = false, flipped = true, show = true">Default</vk-button>
          <vk-button @click="overlay = false, flipped = true, slide = true">Slide</vk-button>
          <vk-button @click="overlay = false, flipped = true, push = true">Push</vk-button>
          <vk-button @click="overlay = false, flipped = true, reveal = true">Reveal</vk-button>
        </div>
      </vk-grid>

      <h2>Overlay</h2>
      <vk-grid gutter="small" class="uk-child-width-auto uk-flex-between">
        <div>
          <vk-button @click="overlay = true, flipped = false, show = true">Default</vk-button>
          <vk-button @click="overlay = true, flipped = false, slide = true">Slide</vk-button>
          <vk-button @click="overlay = true, flipped = false, push = true">Push</vk-button>
          <vk-button @click="overlay = true, flipped = false, reveal = true">Reveal</vk-button>
        </div>
        <div>
          <vk-button @click="overlay = true, flipped = true, show = true">Default</vk-button>
          <vk-button @click="overlay = true, flipped = true, slide = true">Slide</vk-button>
          <vk-button @click="overlay = true, flipped = true, push = true">Push</vk-button>
          <vk-button @click="overlay = true, flipped = true, reveal = true">Reveal</vk-button>
        </div>
      </vk-grid>

      <h2>Options</h2>

      <vk-button @click="inited = false">Destroy</vk-button>

      <vk-offcanvas
        v-if="inited"
        :flipped="flipped"
        :overlay="overlay"
        :show.sync="show"
      >
        <div class="uk-height-1-1 uk-flex uk-flex-column uk-text-center">
          <vk-offcanvas-close enlarged @click="show = false" />
          <demo-nav />
          <demo-icons />
        </div>
      </vk-offcanvas>

      <vk-offcanvas-reveal
        v-if="inited"
        :flipped="flipped"
        :overlay="overlay"
        :show.sync="reveal"
      >
        <div class="uk-height-1-1 uk-flex uk-flex-column uk-text-center">
          <vk-offcanvas-close enlarged @click="reveal = false" />
          <demo-nav />
          <demo-icons />
        </div>
      </vk-offcanvas-reveal>

      <vk-offcanvas-push
        v-if="inited"
        :flipped="flipped"
        :overlay="overlay"
        :show.sync="push"
      >
        <div class="uk-height-1-1 uk-flex uk-flex-column uk-text-center">
          <vk-offcanvas-close enlarged @click="push = false" />
          <demo-nav />
          <demo-icons />
        </div>
      </vk-offcanvas-push>

      <vk-offcanvas-slide
        v-if="inited"
        :flipped="flipped"
        :overlay="overlay"
        :show.sync="slide"
      >
        <div class="uk-height-1-1 uk-flex uk-flex-column uk-text-center">
          <vk-offcanvas-close enlarged @click="slide = false" />
          <demo-nav />
          <demo-icons />
        </div>
      </vk-offcanvas-slide>

      <p v-for="n in 10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

    </div>
  </vk-offcanvas-content>
</template>

<script>
import DemoNav from './_nav.vue'
import DemoIcons from './_icons.vue'

export default {
  components: {
    DemoNav,
    DemoIcons
  },
  data: () => ({
    show: false,
    push: false,
    reveal: false,
    slide: false,
    flipped: false,
    overlay: true,
    inited: true
  })
}
</script>
