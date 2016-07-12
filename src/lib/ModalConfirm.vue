<template>
  <div class="uk-modal" v-el:modal>
    <div class="uk-modal-dialog">
      <div class="uk-modal-content">
        <slot></slot>
      </div>
      <div class="uk-modal-footer uk-text-right">
        <button class="uk-button"
          :disabled="block"
          @click="show = false">
          Cancel
        </button>
        <button class="uk-button uk-button-primary"
          type="button"
          :disabled="block"
          @click="confirm()">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ModalBase from './ModalBase'

export default {
  name: 'VkModalConfirm',
  extends: ModalBase,
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    state: false
  }),
  events: {
    hide: function () {
      if (!this.state) {
        this.$emit('dismiss')
      }
    }
  },
  methods: {
    confirm: function () {
      this.state = true
      this.show = false
      this.$emit('confirm')
    }
  }
}
</script>
