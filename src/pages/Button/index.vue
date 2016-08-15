<template>
  <layouts-default>
    <button-default></button-default>
    <button-radio></button-radio>
    <button-checkbox></button-checkbox>
  </layouts-default>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import ButtonRadio from './ButtonRadio'
import ButtonCheckbox from './ButtonCheckbox'

export default {
  name: 'PageButton',
  components: {
    ButtonDefault,
    ButtonRadio,
    ButtonCheckbox
  }
}
</script>
