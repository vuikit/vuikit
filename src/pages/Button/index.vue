<template>
  <vk-docs-layout-page>
    <button-default></button-default>
    <button-link></button-link>
    <button-radio></button-radio>
    <button-checkbox></button-checkbox>
  </vk-docs-layout-page>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import ButtonLink from './ButtonLink'
import ButtonRadio from './ButtonRadio'
import ButtonCheckbox from './ButtonCheckbox'

export default {
  name: 'PageButton',
  components: {
    ButtonDefault,
    ButtonLink,
    ButtonRadio,
    ButtonCheckbox
  }
}
</script>
