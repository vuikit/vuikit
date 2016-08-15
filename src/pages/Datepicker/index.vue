<template>
  <layouts-default>
    <datepicker></datepicker>
    <datepicker-drop></datepicker-drop>
  </layouts-default>
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
