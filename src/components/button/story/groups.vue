<template>
  <div class="uk-padding">
    <h2>Button Group Checkbox</h2>
    <vk-button-group-checkbox v-model="checkbox">
      <vk-button :value="1">Button 1</vk-button>
      <vk-button :value="2">Button 2</vk-button>
      <vk-button :value="3">Button 3</vk-button>
    </vk-button-group-checkbox>
    <p>Group Value: {{ checkbox }}</p>

    <h2>Button Group Radio</h2>
    <vk-button-group-radio v-model="radio">
      <vk-button :value="1">Button 1</vk-button>
      <vk-button :value="2">Button 2</vk-button>
      <vk-button :value="3">Button 3</vk-button>
    </vk-button-group-radio>
    <p>Group Value: {{ radio }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    radio: 1,
    checkbox: [1]
  })
}
</script>
