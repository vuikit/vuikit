<template>
  <div class="uk-modal" v-el:modal>
    <div class="uk-modal-dialog">
      <div class="uk-modal-content">
        <template v-if="text">{{ text }}</template>
        <slot v-if="!text"></slot>
      </div>
      <div class="uk-modal-footer uk-text-right">
        <vk-button
          :disabled="block"
          @click="show = false"
          text="Cancel">
        </vk-button>
        <vk-button style="primary"
          :disabled="block"
          @click="confirm()"
          text="Ok">
        </vk-button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  extends: Modal,
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
