<template>
  <div class="uk-padding">

    <h2>v-model</h2>
    <vk-textarea v-model="value"/>

    <h2>value/input</h2>
    <vk-textarea :value="value" @input="val => value = val"/>

    <h2>modifiers</h2>
    <vk-textarea placeholder="danger" vk-state="danger"/>

  </div>
</template>

<script>
export default {
  data: () => ({
    value: 'value'
  })
}
</script>
