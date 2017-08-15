<template>
  <vk-button-checkbox
    :group="group"
    :value="demo"
    @change="value => {
      demo = value
    }">
    <vk-button :value="1">Button 1</vk-button>
    <vk-button :value="2">Button 2</vk-button>
    <vk-button :value="3">Button 3</vk-button>
  </vk-button-checkbox>
</template>

<script>
export default {
  data: () => ({
    group: false,
    demo: [1]
  })
}
</script>
