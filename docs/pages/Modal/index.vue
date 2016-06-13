<template>
  <div>
    <modal-default></modal-default>
    <h2 class="tm-docs-subtitle">Lightbox</h2>
    <hr class="uk-article-divider">
    <modal-lightbox></modal-lightbox>
    <h2 class="tm-docs-subtitle">Blank</h2>
    <hr class="uk-article-divider">
    <modal-blank></modal-blank>
    <h2 class="tm-docs-subtitle">Alert</h2>
    <hr class="uk-article-divider">
    <modal-alert></modal-alert>
    <h2 class="tm-docs-subtitle">Confirm</h2>
    <hr class="uk-article-divider">
    <modal-confirm></modal-confirm>
  </div>
</template>

<script>
import ModalDefault from './ModalDefault'
import ModalLightbox from './ModalLightbox'
import ModalBlank from './ModalBlank'
import ModalAlert from './ModalAlert'
import ModalConfirm from './ModalConfirm'

export default {
  components: {
    ModalDefault,
    ModalLightbox,
    ModalBlank,
    ModalAlert,
    ModalConfirm
  }
}
</script>
