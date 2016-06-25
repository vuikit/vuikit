<template>
  <div>
    <button-default></button-default>
    <button-link></button-link>
    <button-checkbox></button-checkbox>
    <button-radio><button-radio>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import ButtonLink from './ButtonLink'
import ButtonCheckbox from './ButtonCheckbox'
import ButtonRadio from './ButtonRadio'

export default {
  components: {
    ButtonDefault,
    ButtonLink,
    ButtonCheckbox,
    ButtonRadio
  }
}
</script>
