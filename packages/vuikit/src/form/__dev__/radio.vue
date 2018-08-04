<template>
  <div class="uk-padding">

    <h2>v-model</h2>
    <vk-radio v-model="value" value="A" label="Option A"/>
    <vk-radio v-model="value" value="B" label="Option B"/>

    <h2>value/input</h2>
    <vk-radio @input="val => value = val" :value="'A'" label="Option A" :checked="value === 'A'"/>
    <vk-radio @input="val => value = val" :value="'B'" label="Option B" :checked="value === 'B'"/>

  </div>
</template>

<script>
export default {
  data: () => ({
    value: 'B'
  })
}
</script>
