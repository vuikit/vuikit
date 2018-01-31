<template>
  <modal-transition>
    <div
      v-if="show"
      style="display: block"
      class="uk-modal uk-modal-full"
    >
      <div
        class="uk-modal-dialog uk-flex uk-flex-center uk-flex-middle"
        style="box-sizing: border-box; min-height: 100vh; height: 100vh;"
      >
        <modal-btn-close
          v-if="closeBtn"
          :type="closeBtn"
          class="uk-modal-close-full"
          @click="$emit('update:show', false)"
        ></modal-btn-close>
        <slot></slot>
      </div>
    </div>
  </modal-transition>
</template>

<script>
import core from './core'
import { includes } from 'vuikit/core/util/lang'
import ModalTransition from './transition'
import ModalBtnClose from './ui/button-close'

export default {
  name: 'ModalFull',
  extends: core,
  components: {
    ModalBtnClose,
    ModalTransition
  },
  props: {
    // determines if close button should be displayed
    closeBtn: {
      type: [Boolean, String],
      default: true,
      validator: val => !val || includes([true, 'large'], val)
    }
  }
}
</script>
