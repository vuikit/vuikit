<template>
  <div class="uk-modal" v-el:modal>
    <div class="uk-modal-dialog">
      <div class="uk-modal-content">
        <template v-if="text">{{ text }}</template>
        <slot v-if="!text"></slot>
      </div>
      <div class="uk-modal-footer uk-text-right">
        <button class="uk-button uk-button-primary"
          :disabled="block"
          @click="show = false">
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ModalBase from './ModalBase'

export default {
  name: 'VkModalAlert',
  extends: ModalBase,
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
