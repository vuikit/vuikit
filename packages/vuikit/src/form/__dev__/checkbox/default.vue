<template>
  <div class="uk-padding">

    <h2>v-model</h2>
    <vk-checkbox label="Toggle" v-model="value"/>

    <h2>@input</h2>
    <vk-checkbox label="Toggle" @input="value = !value" :checked="value === true"/>

    <h2>v-model custom value</h2>
    <vk-checkbox label="Toggle" v-model="custom" true-value="yes" false-value="no"/>

    <h2>@input custom value</h2>
    <vk-checkbox label="Toggle" @input="custom = (custom === 'yes' ? 'no' : 'yes')" :checked="custom === 'yes'"/>

  </div>
</template>

<script>
export default {
  data: () => ({
    value: true,
    custom: 'yes'
  })
}
</script>
