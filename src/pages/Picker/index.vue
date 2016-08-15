<template>
  <layouts-default>
    <picker></picker>
    <picker-drop></picker-drop>
  </layouts-default>
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
