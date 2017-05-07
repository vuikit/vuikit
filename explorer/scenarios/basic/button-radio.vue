<template>
  <vk-button-radio
    :group="group"
    :value="demo.radio"
    @change="value => {
      demo.radio = value
    }">
    <vk-button :value="1">Button 1</vk-button>
    <vk-button :value="2">Button 2</vk-button>
    <vk-button :value="3">Button 3</vk-button>
  </vk-button-radio>
</template>

<script>
export default {
  data: () => ({
    group: false,
    demo: 1
  })
}
</script>
