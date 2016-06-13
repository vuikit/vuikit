<template>
  <div>
    <button-default></button-default>
    <h2 class="tm-docs-subtitle">Link</h2>
    <hr class="uk-article-divider">
    <button-link></button-link>
    <h2 class="tm-docs-subtitle">Checkbox</h2>
    <hr class="uk-article-divider">
    <button-checkbox></button-checkbox>
    <h2 class="tm-docs-subtitle">Radio</h2>
    <hr class="uk-article-divider">
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
