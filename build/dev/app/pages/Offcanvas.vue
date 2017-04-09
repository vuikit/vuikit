<template>
  <div class="uk-container uk-margin-bottom">
    <app-header></app-header>
    <h1>{{ $route.name }}</h1>
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
      @click-out="left.slide = false"
      @key-esc="left.slide = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="left.slide = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas mode="reveal"
      :show="left.reveal"
      @click-out="left.reveal = false"
      @key-esc="left.reveal = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="left.reveal = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas mode="push"
      :show="left.push"
      @click-out="left.push = false"
      @key-esc="left.push = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="left.push = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas mode="none"
      :show="left.none"
      @click-out="left.none = false"
      @key-esc="left.none = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="left.none = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas flip mode="slide"
      :show="right.slide"
      @click-out="right.slide = false"
      @key-esc="right.slide = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="right.slide = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas flip mode="reveal"
      :show="right.reveal"
      @click-out="right.reveal = false"
      @key-esc="right.reveal = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="right.reveal = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas flip mode="push"
      :show="right.push"
      @click-out="right.push = false"
      @key-esc="right.push = false">
      <vk-button class="uk-width-1-1 uk-margin"
        @click="right.push = false">
        Close
      </vk-button>
    </vk-offcanvas>

    <vk-offcanvas flip mode="none"
      :show="right.none"
      @click-out="right.none = false"
      @key-esc="right.none = false">
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
