<template>
  <div class="uk-padding">

    <lorem-ipsum />

    <div id="viewport" class="uk-margin">
      <vk-grid class="uk-child-width-1-6" v-vk-height-viewport="{ offsetTop: true }">
        <div>
          <vk-sticky bottom="#viewport" :offset="50">
            <div class="uk-card uk-card-primary uk-card-body uk-margin">
              Stick to container; 50px offset
            </div>
          </vk-sticky>
        </div>

        <div>
          <vk-sticky top="100vh" :target="10">
            <div class="uk-card uk-card-primary uk-card-body">
              Sticky after 100vh; Scroll up if initially above paragraph below
            </div>
          </vk-sticky>
        </div>

        <div>
          <vk-sticky top="#viewport" animation="slide-top">
            <div class="uk-card uk-card-primary uk-card-body">
              Stick below container; animation
            </div>
          </vk-sticky>
        </div>

        <div>
          <vk-sticky bottom="#hash">
            <div class="uk-card uk-card-primary uk-card-body">Stick until next paragraph</div>
          </vk-sticky>
        </div>

        <div>
          <vk-sticky show-on-up animation="slide-top">
            <div class="uk-card uk-card-primary uk-card-body">Sticky on scroll up; animation</div>
          </vk-sticky>
        </div>

        <div>
          <vk-sticky :top="300" animation="slide-top" :media="640">
            <div class="uk-card uk-card-primary uk-card-body">Sticky after 300px scrolling; @media 640px</div>
          </vk-sticky>
        </div>
      </vk-grid>
    </div>

    <p id="hash" class="uk-margin-large">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <lorem-ipsum v-for="i in 10" :key="i" />
  </div>
</template>

<script>
export default {
  components: {
    LoremIpsum: {
      functional: true,
      render (h) {
        return h('p', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
      }
    }
  }
}
</script>

<style scoped>
#viewport {
  border: 1px dashed rgba(0,0,0,0.2);
}
.uk-card-body {
  padding: 20px !important;
}
</style>
