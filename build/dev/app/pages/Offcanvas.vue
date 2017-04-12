<template>
  <div ref="offcanvas-content">
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

      <vk-offcanvas
        mode="slide"
        content-el="offcanvas-content"
        :show="left.slide"
        @click-out="left.slide = false"
        @key-esc="left.slide = false">
        <vk-offcanvas-close @click="left.slide = false" />
      </vk-offcanvas>

      <vk-offcanvas
        mode="reveal"
        content-el="offcanvas-content"
        :show="left.reveal"
        @click-out="left.reveal = false"
        @key-esc="left.reveal = false">
        <vk-offcanvas-close @click="left.reveal = false" />
      </vk-offcanvas>

      <vk-offcanvas
        mode="push"
        content-el="offcanvas-content"
        :show="left.push"
        @click-out="left.push = false"
        @key-esc="left.push = false">
        <vk-offcanvas-close @click="left.push = false" />
      </vk-offcanvas>

      <vk-offcanvas
        mode="none"
        content-el="offcanvas-content"
        :show="left.none"
        @click-out="left.none = false"
        @key-esc="left.none = false">
        <vk-offcanvas-close @click="left.none = false" />
      </vk-offcanvas>

      <vk-offcanvas
        flip
        mode="slide"
        content-el="offcanvas-content"
        :show="right.slide"
        @click-out="right.slide = false"
        @key-esc="right.slide = false">
        <vk-offcanvas-close @click="right.slide = false" />
      </vk-offcanvas>

      <vk-offcanvas
        flip
        mode="reveal"
        content-el="offcanvas-content"
        :show="right.reveal"
        @click-out="right.reveal = false"
        @key-esc="right.reveal = false">
        <vk-offcanvas-close @click="right.reveal = false" />
      </vk-offcanvas>

      <vk-offcanvas
        flip
        mode="push"
        content-el="offcanvas-content"
        :show="right.push"
        @click-out="right.push = false"
        @key-esc="right.push = false">
        <vk-offcanvas-close @click="right.push = false" />
      </vk-offcanvas>

      <vk-offcanvas
        flip
        mode="none"
        content-el="offcanvas-content"
        :show="right.none"
        @click-out="right.none = false"
        @key-esc="right.none = false">
        <vk-offcanvas-close @click="right.none = false" />
      </vk-offcanvas>
    </div>
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
    },
    content: `
      <div>
        <ul class="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical uk-nav-parent-icon" uk-nav>
          <li class="uk-active"><a href="#">Active</a></li>
          <li class="uk-parent">
            <a href="#">Parent</a>
            <ul class="uk-nav-sub">
              <li><a href="#">Sub item</a></li>
              <li><a href="#">Sub item</a></li>
              <li><a href="#">Sub item</a></li>
              <li><a href="#">Sub item</a></li>
              <li><a href="#">Sub item</a></li>
              <li><a href="#">Sub item</a>
                <ul>
                  <li><a href="#">Sub item</a></li>
                  <li><a href="#">Sub item</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><a href="#">Item</a></li>
          <li><a href="#">Item</a></li>
        </ul>

        <div>
          <div class="uk-grid-small uk-child-width-auto uk-flex-inline" uk-grid>
            <div>
              <a class="uk-icon-button" href="#" uk-icon="icon: facebook"></a>
            </div>
            <div>
              <a class="uk-icon-button" href="#" uk-icon="icon: twitter"></a>
            </div>
            <div>
              <a class="uk-icon-button" href="#" uk-icon="icon: mail"></a>
            </div>
            <div>
              <a class="uk-icon-button" href="#" uk-icon="icon: receiver"></a>
            </div>
          </div>
        </div>
      </div>`
  })
}
</script>
