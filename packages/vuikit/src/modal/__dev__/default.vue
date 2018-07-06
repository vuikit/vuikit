<template>
  <div>

    <div class="uk-container uk-padding">

      <h1>Modal</h1>

      <p v-vk-margin>
        <vk-button @click="show = true">Default</vk-button>
        <vk-button @click="sections = true">Sections</vk-button>
        <vk-button @click="scrollable = true">Scrollable</vk-button>
        <vk-button @click="expanded = true">Expanded</vk-button>
        <vk-button @click="centered = true">Centered</vk-button>
      </p>

      <h2>Full</h2>

      <p v-vk-margin>
        <vk-button @click="full = true">Full</vk-button>
        <vk-button @click="fullSplit = true">Full Split</vk-button>
      </p>

      <vk-modal
        :show.sync="show"
      >
        <vk-modal-close @click="show = false"/>
        <vk-modal-title>Headline</vk-modal-title>
        <p>{{ lorem }}</p>
        <div class="uk-text-right">
          <vk-button @click="show = false">Cancel</vk-button>
          <vk-button type="primary">Save</vk-button>
        </div>
      </vk-modal>

      <vk-modal
        :show.sync="sections"
      >
        <vk-modal-title slot="header">Headline</vk-modal-title>
        <p>{{ lorem }}</p>
        <div slot="footer" class="uk-text-right">
          <vk-button @click="sections = false">Cancel</vk-button>
          <vk-button type="primary">Save</vk-button>
        </div>
      </vk-modal>

      <vk-modal
        scrollable
        :show.sync="scrollable"
      >
        <vk-modal-title slot="header">Headline</vk-modal-title>
        <p v-for="n in 10">{{ lorem }}</p>
        <div slot="footer" class="uk-text-right">
          <vk-button @click="scrollable = false">Cancel</vk-button>
          <vk-button type="primary">Save</vk-button>
        </div>
      </vk-modal>

      <vk-modal
        expanded
        :show.sync="expanded"
      >
        <p v-for="n in 10">{{ lorem }}</p>
      </vk-modal>

      <vk-modal
        centered
        :show.sync="centered"
      >
        <p>{{ lorem }}</p>
      </vk-modal>

    </div>

    <vk-modal-full
      :show.sync="full"
    >
      <vk-modal-close large @click="full = false"/>
      <div class="uk-width-xxlarge uk-padding-large">
        <h1>Headline</h1>
        <p>{{ lorem }}</p>
      </div>
    </vk-modal-full>

    <vk-modal-full
      :show.sync="fullSplit"
    >
      <vk-modal-close large @click="fullSplit = false"/>
      <vk-grid class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle">
        <div class="uk-background-cover" style="background-image: url('/images/photo.jpg');" v-vk-height-viewport></div>
        <div class="uk-padding-large">
          <h1>Headline</h1>
          <p>{{ lorem }}</p>
        </div>
      </vk-grid>
    </vk-modal-full>

    <div class="uk-section uk-section-muted uk-section-small uk-margin">
      <div class="uk-float-left">Left</div>
      <div class="uk-float-right">Right</div>
      <div class="uk-container">Container</div>
    </div>

    <div class="uk-container">
      <p v-for="n in 10" :key="n">{{ lorem }}</p>
    </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    sections: false,
    scrollable: false,
    expanded: false,
    centered: false,
    full: false,
    fullSplit: false,
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
}
</script>
