<template>
  <div class="uk-modal" v-el:modal>
    <div class="uk-modal-dialog"
      :class="{
        'uk-modal-dialog-large': large
      }">
      <!-- close button -->
      <a class="uk-modal-close uk-close"
        href=""
        v-if="!block && !hideClose">
      </a>
      <!-- header -->
      <div v-el:header class="uk-modal-header">
        <slot name="header"></slot>
      </div>
      <!-- content -->
      <div v-el:content class="uk-modal-content"
        :class="{
          'uk-overflow-container': overflow
        }">
        <slot></slot>
      </div>
      <!-- footer -->
      <div v-el:footer class="uk-modal-footer">
        <slot name="footer"></slot>
      </div>
      <!-- caption -->
      <div v-el:caption class="uk-modal-caption">
        <slot name="caption"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import ModalBase from './ModalBase'

export default {
  extends: ModalBase,
  props: {
    overflow: {
      type: Boolean,
      default: false
    },
    hideClose: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    bgClose: {
      type: Boolean,
      default: true
    }
  },
  ready: function () {
    // remove parents nodes of slots
    // that were not set
    if (!this.isModalSlotSet('header')) {
      this.removeModalSlot('header')
    }
    if (!this.isModalSlotSet('content')) {
      this.removeModalSlot('content')
    }
    if (!this.isModalSlotSet('footer')) {
      this.removeModalSlot('footer')
    }
    if (!this.isModalSlotSet('caption')) {
      this.removeModalSlot('caption')
    }
    // init
    this.initModal()
  },
  methods: {
    removeModalSlot: function (slot) {
      if (this.$els[slot]) {
        this.$els[slot].parentNode.removeChild(this.$els[slot])
      }
    },
    isModalSlotSet: function (slot) {
      return this.$els[slot] && (this.$els[slot].innerHTML.trim() !== '')
    }
  }
}
</script>
