<template>
  <vk-docs-layout-page>
    <modal-default></modal-default>
    <!-- <modal-lightbox></modal-lightbox>
    <modal-blank></modal-blank>
    <modal-alert></modal-alert>
    <modal-confirm></modal-confirm> -->
  </vk-docs-layout-page>
</template>

<script>
import ModalDefault from './Modal'
// import ModalLightbox from './ModalLightbox'
// import ModalBlank from './ModalBlank'
// import ModalAlert from './ModalAlert'
// import ModalConfirm from './ModalConfirm'

export default {
  name: 'PageModal',
  components: {
    ModalDefault
    // ModalLightbox,
    // ModalBlank,
    // ModalAlert,
    // ModalConfirm
  }
}
</script>
