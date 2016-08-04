<template>
  <vk-docs-layout-page>
    <picker></picker>
    <!-- <picker-drop></picker-drop> -->
  </vk-docs-layout-page>
</template>

<script>
import Picker from './Picker'
import PickerDrop from './PickerDrop'

export default {
  name: 'PagePicker',
  components: {
    Picker,
    PickerDrop
  }
}
</script>
