<template>
  <div class="uk-padding">

    <h2>v-model</h2>
    <vk-select v-model="selected">
      <option disabled value="">Please select one</option>
      <option value="1">Option 01</option>
      <option value="2">Option 02</option>
    </vk-select>

    <h2>value/input</h2>
    <vk-select :value="selected" @input="val => selected = val">
      <option disabled value="">Please select one</option>
      <option value="1">Option 01</option>
      <option value="2">Option 02</option>
    </vk-select>

    <h2>v-model multiple</h2>
    <vk-select multiple v-model="multiple">
      <option value="1">Option 01</option>
      <option value="2">Option 02</option>
    </vk-select>

    <select multiple v-model="multiple">
      <option value="1">Option 01</option>
      <option value="2">Option 02</option>
    </select>

    <h2>value/input multiple</h2>
    <vk-select multiple :value="multiple" @input="val => multiple = val">
      <option value="1">Option 01</option>
      <option value="2">Option 02</option>
    </vk-select>

    <h2>modifiers</h2>
    <vk-select vk-state="danger" value="">
      <option disabled value="">Please select one</option>
      <option>Option 01</option>
      <option>Option 02</option>
    </vk-select>

  </div>
</template>

<script>
export default {
  data: () => ({
    selected: '2',
    multiple: ['2']
  })
}
</script>
