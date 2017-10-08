<template>
  <div class="uk-padding">
    <h1>Button</h1>
    <ui-button>Default</ui-button>
    <ui-button disabled>Disabled</ui-button>

    <h2>Type</h2>
    <ui-button type="primary">Primary</ui-button>
    <ui-button type="secondary">Secondary</ui-button>
    <ui-button type="danger">Danger</ui-button>
    <ui-button type="text">Text</ui-button>
    <ui-button type="link">Link</ui-button>

    <h2>Size</h2>
    <ui-button size="large">Large</ui-button>
    <ui-button>Default</ui-button>
    <ui-button size="small">Small</ui-button>
  </div>
</template>

<script>
import UiButton from './button'

export default {
  components: {
    UiButton
  }
}
</script>
