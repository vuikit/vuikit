<template>
  <div>

    <vk-section type="default">
      <div class="uk-container uk-position-relative">

        <h1>Section Default</h1>

        <vk-grid matched class="uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="muted">
      <div class="uk-container">

        <h1>Section Muted</h1>

        <vk-grid matched class="uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="primary">
      <div class="uk-container">

        <h1>Section Primary</h1>

        <vk-grid matched class="uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="secondary">
      <div class="uk-container">

        <h1>Section Secondary</h1>

        <vk-grid matched class="uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="default" size="xsmall">
      <div class="uk-container">
        <p>XSmall Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>
    </vk-section>

    <vk-section type="muted" size="xsmall">
      <div class="uk-container">
        <p>XSmall Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>
    </vk-section>

    <vk-section type="primary" size="xsmall">
      <div class="uk-container">
        <p>XSmall Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>
    </vk-section>

    <vk-section type="secondary" size="xsmall">
      <div class="uk-container">
        <p>XSmall Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>
    </vk-section>

    <vk-section type="default" size="small">
      <div class="uk-container">

        <vk-grid gutter="large" class="uk-flex-middle">
          <div class="uk-width-expand">
            <p class="uk-text-large">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </div>
          <div class="uk-width-auto">
            <a class="uk-button uk-button-primary uk-button-large" href="#">Default Small</a>
          </div>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="muted" size="small">
      <div class="uk-container">

        <vk-grid gutter="large" class="uk-flex-middle">
          <div class="uk-width-expand">
            <p class="uk-text-large">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </div>
          <div class="uk-width-auto">
            <a class="uk-button uk-button-primary uk-button-large" href="#">Muted Small</a>
          </div>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="primary" size="small">
      <div class="uk-container">

        <vk-grid gutter="large" class="uk-flex-middle">
          <div class="uk-width-expand">
            <p class="uk-text-large">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </div>
          <div class="uk-width-auto">
            <a class="uk-button uk-button-primary uk-button-large" href="#">Primary Small</a>
          </div>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="secondary" size="small">
      <div class="uk-container">

        <vk-grid gutter="large" class="uk-flex-middle">
          <div class="uk-width-expand">
            <p class="uk-text-large">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </div>
          <div class="uk-width-auto">
            <a class="uk-button uk-button-primary uk-button-large" href="#">Secondary Small</a>
          </div>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="default" size="large">
      <div class="uk-container">

        <h1 class="uk-heading-primary uk-text-center">Default Large</h1>

        <p class="uk-text-large uk-text-center">Excepteur sint occaecat cupidatat non proident, sunt in<br class="uk-visible@m"> culpa qui officia deserunt mollit anim id est laborum.</p>

        <vk-grid matched class="uk-margin-large uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="muted" size="large">
      <div class="uk-container">

        <h1 class="uk-heading-primary uk-text-center">Muted Large</h1>

        <p class="uk-text-large uk-text-center">Excepteur sint occaecat cupidatat non proident, sunt in<br class="uk-visible@m"> culpa qui officia deserunt mollit anim id est laborum.</p>

        <vk-grid matched class="uk-margin-large uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="primary" size="large">
      <div class="uk-container">

        <h1 class="uk-heading-primary uk-text-center">Primary Large</h1>

        <p class="uk-text-large uk-text-center">Excepteur sint occaecat cupidatat non proident, sunt in<br class="uk-visible@m"> culpa qui officia deserunt mollit anim id est laborum.</p>

        <vk-grid matched class="uk-margin-large uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="secondary" size="large">
      <div class="uk-container">

        <h1 class="uk-heading-primary uk-text-center">Secondary Large</h1>

        <p class="uk-text-large uk-text-center">Excepteur sint occaecat cupidatat non proident, sunt in<br class="uk-visible@m"> culpa qui officia deserunt mollit anim id est laborum.</p>

        <vk-grid matched class="uk-margin-large uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="default" size="xlarge">
      <div class="uk-container">

        <h1 class="uk-heading-primary uk-text-center">Default XLarge</h1>

        <p class="uk-text-large uk-text-center">Excepteur sint occaecat cupidatat non proident, sunt in<br class="uk-visible@m"> culpa qui officia deserunt mollit anim id est laborum.</p>

        <vk-grid matched class="uk-margin-large uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="muted" size="xlarge">
      <div class="uk-container">

        <h1 class="uk-heading-primary uk-text-center">Muted XLarge</h1>

        <p class="uk-text-large uk-text-center">Excepteur sint occaecat cupidatat non proident, sunt in<br class="uk-visible@m"> culpa qui officia deserunt mollit anim id est laborum.</p>

        <vk-grid matched class="uk-margin-large uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="primary" size="xlarge">
      <div class="uk-container">

        <h1 class="uk-heading-primary uk-text-center">Primary XLarge</h1>

        <p class="uk-text-large uk-text-center">Excepteur sint occaecat cupidatat non proident, sunt in<br class="uk-visible@m"> culpa qui officia deserunt mollit anim id est laborum.</p>

        <vk-grid matched class="uk-margin-large uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="secondary" size="xlarge">
      <div class="uk-container">

        <h1 class="uk-heading-primary uk-text-center">Secondary XLarge</h1>

        <p class="uk-text-large uk-text-center">Excepteur sint occaecat cupidatat non proident, sunt in<br class="uk-visible@m"> culpa qui officia deserunt mollit anim id est laborum.</p>

        <vk-grid matched class="uk-margin-large uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

    <vk-section type="default" class="uk-padding-remove-vertical">
      <div class="uk-container">

        <h1>Padding Remove</h1>

        <vk-grid matched class="uk-child-width-1-3@m">
          <lorem v-for="n in 3" :key="n"/>
        </vk-grid>

      </div>
    </vk-section>

  </div>
</template>

<script>
export default {
  components: {
    lorem: {
      functional: true,
      render (h) {
        return h('div', [
          h('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
        ])
      }
    }
  }
}
</script>
