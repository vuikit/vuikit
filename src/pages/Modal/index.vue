<template>
  <vk-docs-layout-page>
    <modal-default></modal-default>
    <modal-confirm></modal-confirm>
  </vk-docs-layout-page>
</template>

<script>
import ModalDefault from './Modal'
import ModalConfirm from './ModalConfirm'

export default {
  name: 'PageModal',
  components: {
    ModalDefault,
    ModalConfirm
  }
}
</script>
