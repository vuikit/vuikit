<template>
  <div>
    <vk-button @click="action('clicked')">Button</vk-button>

    <h4>States</h4>
    <vk-button active>Active</vk-button>
    <vk-button disabled>Disabled</vk-button>

    <h4>Modifiers</h4>
    <vk-button large>Large</vk-button>
    <vk-button primary>Primary</vk-button>
    <vk-button secondary>Secondary</vk-button>
    <vk-button danger>Danger</vk-button>
    <vk-button small>Small</vk-button>
    <vk-button text>Text</vk-button>
    <vk-button link>Link</vk-button>
  </div>
</template>

<script>

export default {
  methods: {
    action (log) {
      console.log(log)
    }
  }
}
</script>
