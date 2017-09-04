<template>
  <div>
    <vk-button-group-checkbox v-model="value">
      <vk-button :value="1">Button 1</vk-button>
      <vk-button :value="2">Button 2</vk-button>
      <vk-button :value="3">Button 3</vk-button>
    </vk-button-group-checkbox>
    <p>Value: {{ value }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: [1]
  })
}
</script>
