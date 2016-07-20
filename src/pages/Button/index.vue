<template>
  <vk-docs-layout-page>
    <button-default></button-default>
    <button-link></button-link>
    <button-checkbox></button-checkbox>
    <button-radio><button-radio>
  </vk-docs-layout-page>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import ButtonLink from './ButtonLink'
import ButtonCheckbox from './ButtonCheckbox'
import ButtonRadio from './ButtonRadio'

export default {
  name: 'PageButton',
  components: {
    ButtonDefault,
    ButtonLink,
    ButtonCheckbox,
    ButtonRadio
  }
}
</script>
