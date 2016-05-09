<template>
  <div class="uk-modal" v-el:modal>
    <div class="uk-modal-dialog" :class="{
      'uk-modal-dialog-large': large,
      'uk-modal-dialog-lightbox': lightbox,
      'uk-modal-dialog-blank': blank }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import UI from 'uikit'

export default {
  props: {
    options: {
      type: Object,
      coerce: (options) => Vue.util.extend({
        keyboard: true,
        bgclose: true,
        minScrollHeight: 150,
        center: false,
        modal: true
      }, options || {})
    },
    show: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    lightbox: {
      type: Boolean,
      default: false
    },
    blank: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show: function (state) {
      if (state) {
        this._show()
      } else if (this.UImodal.isActive()) {
        this._hide()
      }
    },
    block: function (state) {
      state
        ? this._block()
        : this._unblock()
    }
  },
  ready: function () {
    var vm = this
    this.UImodal = UI.modal(this.$els.modal, this.options)
    this.UImodal.on('show.uk.modal', () => {
      vm.show = true
      vm.$dispatch('show')
      setTimeout(function () {
        // catch .uk-overflow-container
        vm.UImodal.resize()
      }, 1)
    })
    this.UImodal.on('hide.uk.modal', () => {
      vm.show = false
      vm.$dispatch('hide')
    })
  },
  methods: {
    _show: function () {
      this.UImodal.show()
    },
    _hide: function () {
      this.UImodal.hide()
    },
    _block: function () {
      this.UImodal.options.bgclose = false
      this.UImodal.options.keyboard = false
      this.UImodal.options.modal = false
      this.$dispatch('block')
    },
    _unblock: function () {
      this.UImodal.options.bgclose = true
      this.UImodal.options.keyboard = true
      this.UImodal.options.modal = true
      this.$dispatch('unblock')
    }
  }
}
</script>
