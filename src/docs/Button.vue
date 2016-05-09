<template>
  <div>
    <h2>Types</h2>
    <vk-button-link
      href="#"
      color="primary"
      @click.prevent>
      Link
    </vk-button-link>
    <vk-button>Button</vk-button>
    <vk-button disabled>Disabled</vk-button>
    <hr class="uk-article-divider">
    <h2>Colors</h2>
    <vk-button color="primary">Primary</vk-button>
    <vk-button color="success">Success</vk-button>
    <vk-button color="danger">Danger</vk-button>
    <vk-button color="link">Link</vk-button>
    <hr class="uk-article-divider">
    <h2>Sizes</h2>
    <vk-button size="mini">Mini</vk-button>
    <vk-button size="small">Small</vk-button>
    <vk-button size="default">Default</vk-button>
    <vk-button size="large">Large</vk-button>
    <hr class="uk-article-divider">
    <h2>Width</h2>
    <div class="uk-flex uk-flex-wrap uk-flex-wrap-space-around">
      <vk-button color="primary" width="1-1">1</vk-button>
      <vk-button width="1-1">2</vk-button>
    </div>
    <hr class="uk-article-divider">
    <h2>State</h2>
    <vk-button
      :state="state"
      @click="state = !state">
      Button
    </vk-button>
    <hr class="uk-article-divider">
    <h2>Icon</h2>
    <vk-button-link
      icon="user">
      Link
    </vk-button-link>
    <vk-button-link
      icon="user"
      :icon-right="true">
      Link
    </vk-button-link>
    <vk-button
      icon="cog">
      Button
    </vk-button>
    <vk-button
      icon="cog"
      :icon-right="true">
      Button
    </vk-button>
    <hr class="uk-article-divider">
    <h2>Checkbox Buttons</h2>
    <div class="uk-button-group" data-uk-button-checkbox>
      <vk-button>Button</vk-button>
      <vk-button>Button</vk-button>
      <vk-button>Button</vk-button>
    </div>
    <hr class="uk-article-divider">
    <h2>Radio Buttons</h2>
    <div class="uk-button-group" data-uk-button-radio>
      <vk-button>Button</vk-button>
      <vk-button>Button</vk-button>
      <vk-button>Button</vk-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    state: false
  })
}
</script>
