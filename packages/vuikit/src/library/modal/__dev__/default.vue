<template>
  <div>

    <div class="uk-container uk-padding">

      <h1>Modal</h1>

      <vk-grid class="uk-child-width-1-4@m">

        <div>
          <p v-vk-margin>
            <vk-button @click="show = true">Default</vk-button>
            <vk-button @click="outside = true">Outside</vk-button>
            <vk-button @click="sections = true">Sections</vk-button>
            <vk-button @click="scrollbar = true">Scrollbar</vk-button>
            <vk-button @click="overflowAuto = true">Overflow Auto</vk-button>
            <vk-button @click="container = true">Size Container</vk-button>
            <vk-button @click="width = true">Size Width</vk-button>
            <vk-button @click="center = true">Center</vk-button>
            <vk-button @click="full = true">Full</vk-button>
            <vk-button @click="fullSplit = true">Full Split</vk-button>
          </p>
        </div>

        <div>
          <h2>Group</h2>
          <p v-vk-margin>
            <vk-button @click="group1 = true">Modal 1</vk-button>
            <vk-button @click="group2 = true">Modal 2</vk-button>
          </p>
        </div>

        <div>
          <h2>Stack</h2>
          <p v-vk-margin>
            <vk-button @click="stack1 = true">Modal 1</vk-button>
            <vk-button @click="stack2 = true">Modal 2</vk-button>
          </p>
        </div>
      </vk-grid>

      <vk-modal
        :show.sync="show"
        @keyup.esc="show = false"
      >
        <vk-modal-close></vk-modal-close>
        <vk-modal-title>Headline</vk-modal-title>
        <p>{{ lorem }}</p>
        <div class="uk-text-right">
          <vk-button @click="show = false">Cancel</vk-button>
          <vk-button type="primary">Save</vk-button>
        </div>
      </vk-modal>

      <vk-modal
        :show.sync="outside"
        @keyup.esc="outside = false"
      >
        <vk-modal-close outside></vk-modal-close>
        <vk-modal-title>Headline</vk-modal-title>
        <p>{{ lorem }}</p>
        <div class="uk-text-right">
          <vk-button @click="outside = false">Cancel</vk-button>
          <vk-button type="primary">Save</vk-button>
        </div>
      </vk-modal>

      <vk-modal
        :show.sync="sections"
        @keyup.esc="sections = false"
      >
        <vk-modal-close></vk-modal-close>
        <vk-modal-title slot="header">Headline</vk-modal-title>
        <p>{{ lorem }}</p>
        <div slot="footer" class="uk-text-right">
          <vk-button @click="sections = false">Cancel</vk-button>
          <vk-button type="primary">Save</vk-button>
        </div>
      </vk-modal>

      <vk-modal
        :show.sync="scrollbar"
        @keyup.esc="scrollbar = false"
      >
        <vk-modal-close></vk-modal-close>
        <p v-for="n in 10">{{ lorem }}</p>
      </vk-modal>

      <vk-modal
        overflow-auto
        :show.sync="overflowAuto"
        @keyup.esc="overflowAuto = false"
      >
        <vk-modal-close></vk-modal-close>
        <vk-modal-title slot="header">Headline</vk-modal-title>
        <p v-for="n in 10">{{ lorem }}</p>
        <div slot="footer" class="uk-text-right">
          <vk-button @click="overflowAuto = false">Cancel</vk-button>
          <vk-button type="primary">Save</vk-button>
        </div>
      </vk-modal>

      <vk-modal
        size="container"
        :show.sync="container"
        @keyup.esc="container = false"
      >
        <vk-modal-close></vk-modal-close>
        <p v-for="n in 10">{{ lorem }}</p>
      </vk-modal>

      <vk-modal
        size="3-4@m 2-3@l 1-2@xl"
        :show.sync="width"
        @keyup.esc="width = false"
      >
        <vk-modal-close></vk-modal-close>
        <p v-for="n in 10">{{ lorem }}</p>
      </vk-modal>

      <vk-modal
        center
        :show.sync="center"
        @keyup.esc="center = false"
      >
        <vk-modal-close></vk-modal-close>
        <p>{{ lorem }}</p>
      </vk-modal>

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

      <vk-modal
        :show.sync="group1"
        @keyup.esc="group1 = false"
      >
        <vk-modal-close></vk-modal-close>
        <vk-modal-title slot="header">Headline 1</vk-modal-title>
        <p>{{ lorem }}</p>
        <div slot="footer" class="uk-text-right">
          <vk-button @click="group1 = false">Cancel</vk-button>
          <vk-button type="primary" @click="group2 = true">Next</vk-button>
        </div>
      </vk-modal>

      <vk-modal
        :show.sync="group2"
        @keyup.esc="group2 = false"
      >
        <vk-modal-close></vk-modal-close>
        <vk-modal-title slot="header">Headline 2</vk-modal-title>
        <p>{{ lorem }}</p>
        <div slot="footer" class="uk-text-right">
          <vk-button @click="group2 = false">Cancel</vk-button>
          <vk-button type="primary" @click="group1 = true">Previous</vk-button>
        </div>
      </vk-modal>

      <vk-modal
        :show.sync="stack1"
        @keyup.esc="stack1 = false"
      >
        <vk-modal-close></vk-modal-close>
        <vk-modal-title slot="header">Headline 1</vk-modal-title>
        <p>{{ lorem }}</p>
        <div slot="footer" class="uk-text-right">
          <vk-button @click="stack1 = false">Cancel</vk-button>
          <vk-button type="primary" @click="stack2 = true">Next</vk-button>
        </div>
      </vk-modal>

      <vk-modal
        stack
        :show.sync="stack2"
        @keyup.esc="stack2 = false"
      >
        <vk-modal-close></vk-modal-close>
        <vk-modal-title slot="header">Headline 2</vk-modal-title>
        <p>{{ lorem }}</p>
        <div slot="footer" class="uk-text-right">
          <vk-button @click="stack2 = false">Cancel</vk-button>
        </div>
      </vk-modal>
    </div>

    <div class="uk-section uk-section-muted uk-section-small uk-margin">
      <div class="uk-float-left">Left</div>
      <div class="uk-float-right">Right</div>
      <div class="uk-container">Container</div>
    </div>

    <div class="uk-container">
      <p v-for="n in 10">{{ lorem }}</p>
    </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    outside: false,
    width: false,
    sections: false,
    scrollbar: false,
    overflowAuto: false,
    container: false,
    center: false,
    full: false,
    fullSplit: false,
    group1: false,
    group2: false,
    stack1: false,
    stack2: false,
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
}
</script>
