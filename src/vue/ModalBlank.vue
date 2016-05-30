<template>
  <div class="uk-modal" v-el:modal>
    <div class="uk-modal-dialog uk-modal-dialog-blank">
      <a href="" class="uk-modal-close uk-close uk-close-alt"></a>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ModalBase from './ModalBase'

export default {
  extends: ModalBase
}
</script>
