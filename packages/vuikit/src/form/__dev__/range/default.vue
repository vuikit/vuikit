<template>
  <div class="uk-padding">

    <h2>v-model</h2>
    <vk-range v-model="value" :min="0" :max="10" :step="0.1"/>

    <h2>v-model.number</h2>
    <vk-range v-model.number="value" :min="0" :max="10" :step="0.1"/>

    <h2>value/input</h2>
    <vk-range :value="value" @input="val => value = val" :min="0" :max="10" :step="0.1"/>

    {{ $data }}

  </div>
</template>

<script>
export default {
  data: () => ({
    value: 2
  })
}
</script>
