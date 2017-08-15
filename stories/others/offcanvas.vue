<template>
  <vk-offcanvas-content>
    <div class="uk-container uk-margin-bottom">
      <h1>Offcanvas</h1>

      <div>
        <vk-button @click="left.slide = true">Slide</vk-button>
        <vk-button @click="left.reveal = true">Reveal</vk-button>
        <vk-button @click="left.push = true">Push</vk-button>
        <vk-button @click="left.none = true">None</vk-button>
      </div>
      <div class="uk-margin">
        <vk-button @click="right.slide = true">Slide</vk-button>
        <vk-button @click="right.reveal = true">Reveal</vk-button>
        <vk-button @click="right.push = true">Push</vk-button>
        <vk-button @click="right.none = true">None</vk-button>
      </div>

      <vk-offcanvas
        mode="slide"
        :show="left.slide"
        @click-out="left.slide = false"
        @key-esc="left.slide = false">
        <vk-offcanvas-close @click="left.slide = false" />
      </vk-offcanvas>

      <vk-offcanvas
        mode="reveal"
        :show="left.reveal"
        @click-out="left.reveal = false"
        @key-esc="left.reveal = false">
        <vk-offcanvas-close @click="left.reveal = false" />
      </vk-offcanvas>

      <vk-offcanvas
        mode="push"
        :show="left.push"
        @click-out="left.push = false"
        @key-esc="left.push = false">
        <vk-offcanvas-close @click="left.push = false" />
      </vk-offcanvas>

      <vk-offcanvas
        mode="none"
        :show="left.none"
        @click-out="left.none = false"
        @key-esc="left.none = false">
        <vk-offcanvas-close @click="left.none = false" />
      </vk-offcanvas>

      <vk-offcanvas
        flip
        mode="slide"
        :show="right.slide"
        @click-out="right.slide = false"
        @key-esc="right.slide = false">
        <vk-offcanvas-close @click="right.slide = false" />
      </vk-offcanvas>

      <vk-offcanvas
        flip
        mode="reveal"
        :show="right.reveal"
        @click-out="right.reveal = false"
        @key-esc="right.reveal = false">
        <vk-offcanvas-close @click="right.reveal = false" />
      </vk-offcanvas>

      <vk-offcanvas
        flip
        mode="push"
        :show="right.push"
        @click-out="right.push = false"
        @key-esc="right.push = false">
        <vk-offcanvas-close @click="right.push = false" />
      </vk-offcanvas>

      <vk-offcanvas
        flip
        mode="none"
        :show="right.none"
        @click-out="right.none = false"
        @key-esc="right.none = false">
        <vk-offcanvas-close @click="right.none = false" />
      </vk-offcanvas>
    </div>
  </vk-offcanvas-content>
</template>

<script>
export default {
  data: () => ({
    left: {
      slide: false,
      reveal: false,
      push: false,
      none: false
    },
    right: {
      slide: false,
      reveal: false,
      push: false,
      none: false
    }
  })
}
</script>
