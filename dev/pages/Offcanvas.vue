<template>
  <div>
    <div class="uk-navbar">
      <div class="uk-navbar-left">
        <vk-button @click="left.slide = true">Slide</vk-button>
        <vk-button @click="left.reveal = true">Reveal</vk-button>
        <vk-button @click="left.push = true">Push</vk-button>
        <vk-button @click="left.none = true">None</vk-button>
      </div>
      <div class="uk-navbar-right">
        <vk-button @click="right.slide = true">Slide</vk-button>
        <vk-button @click="right.reveal = true">Reveal</vk-button>
        <vk-button @click="right.push = true">Push</vk-button>
        <vk-button @click="right.none = true">None</vk-button>
      </div>
    </div>

    <vk-offcanvas mode="slide"
      :show="left.slide"
      @clickOut="left.slide = false"
      @keyEsc="left.slide = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="left.slide = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas mode="reveal"
      :show="left.reveal"
      @clickOut="left.reveal = false"
      @keyEsc="left.reveal = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="left.reveal = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas mode="push"
      :show="left.push"
      @clickOut="left.push = false"
      @keyEsc="left.push = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="left.push = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas mode="none"
      :show="left.none"
      @clickOut="left.none = false"
      @keyEsc="left.none = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="left.none = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas flip mode="slide"
      :show="right.slide"
      @clickOut="right.slide = false"
      @keyEsc="right.slide = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="right.slide = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas flip mode="reveal"
      :show="right.reveal"
      @clickOut="right.reveal = false"
      @keyEsc="right.reveal = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="right.reveal = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas flip mode="push"
      :show="right.push"
      @clickOut="right.push = false"
      @keyEsc="right.push = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="right.push = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas flip mode="none"
      :show="right.none"
      @clickOut="right.none = false"
      @keyEsc="right.none = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="right.none = false">
        Close
      </vk-button>
    </vk-offcanvas>
  </div>
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
