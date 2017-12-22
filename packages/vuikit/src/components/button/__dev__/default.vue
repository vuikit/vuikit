<template>
  <div class="uk-padding">
    <h2>Button</h2>
    <vk-button>Default</vk-button>
    <vk-button disabled>Disabled</vk-button>

    <h3>Type</h3>
    <vk-button type="primary">Primary</vk-button>
    <vk-button type="secondary">Secondary</vk-button>
    <vk-button type="danger">Danger</vk-button>
    <vk-button type="text">Text</vk-button>
    <vk-button type="link">Link</vk-button>

    <h3>Size</h3>
    <vk-button size="large">Large</vk-button>
    <vk-button>Default</vk-button>
    <vk-button size="small">Small</vk-button>
  </div>
</template>

<script>
import { Button as VkButton } from '../'

export default {
  components: {
    VkButton
  }
}
</script>
