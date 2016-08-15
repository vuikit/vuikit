<template>
  <layouts-default>
    <modal-default></modal-default>
    <modal-confirm></modal-confirm>
  </layouts-default>
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
