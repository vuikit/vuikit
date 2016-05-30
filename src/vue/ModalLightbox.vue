<template>
  <div class="uk-modal" v-el:modal>
    <div class="uk-modal-dialog uk-modal-dialog-lightbox">
      <a class="uk-modal-close uk-close uk-close-alt"
        href=""
        v-if="!block && !hideClose">
      </a>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ModalBase from './ModalBase'

export default {
  extends: ModalBase,
  props: {
    hideClose: {
      type: Boolean,
      default: false
    },
    bgClose: {
      type: Boolean,
      default: true
    }
  }
}
</script>
