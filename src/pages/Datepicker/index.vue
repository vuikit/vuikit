<template>
  <vk-docs-layout-page>
    <datepicker></datepicker>
    <datepicker-drop></datepicker-drop>
  </vk-docs-layout-page>
</template>

<script>
import Datepicker from './Datepicker'
import DatepickerDrop from './DatepickerDrop'

export default {
  name: 'PageDatepicker',
  components: {
    Datepicker,
    DatepickerDrop
  }
}
</script>
