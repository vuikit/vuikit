<template>
  <vk-docs-layout-page>
    <button-default></button-default>
    <button-radio></button-radio>
    <button-checkbox></button-checkbox>
  </vk-docs-layout-page>
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
