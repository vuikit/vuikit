<template>
  <modal-transition
    @enter="updateOverflowAuto"
  >
    <div ref="modal"
      v-if="show"
      :style="{
        display: center
          ? ''
          : 'block'
      }"
      :class="['uk-modal', {
        'uk-modal-container': container,
        'uk-flex uk-flex-top': center
      }]"
      @click.self="closeOnBg && $emit('update:show', false)"
    >
      <div ref="dialog"
        :class="['uk-modal-dialog', widthClasses, {
          'uk-margin-auto-vertical': center
        }]"
      >
        <!-- dialog slot for customizations, for content prefer body slot -->
        <slot name="dialog"></slot>

        <!-- close button -->
        <modal-btn-close
          v-if="closeBtn"
          :type="closeBtn"
          class="uk-modal-close-default"
          @click="$emit('update:show', false)"
        ></modal-btn-close>

        <!-- header -->
        <div ref="header"
          v-if="$slots.header"
          class="uk-modal-header"
        >
          <slot name="header"></slot>
        </div>

        <!-- body -->
        <div ref="body"
          v-if="$slots.default"
          :class="['uk-modal-body', {
            'uk-overflow-auto': overflowAuto
          }]"
        >
          <slot></slot>
        </div>

        <!-- footer -->
        <div ref="footer"
          v-if="$slots.footer"
          class="uk-modal-footer"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </modal-transition>
</template>

<script>
import css from 'vuikit/core/helpers/css'
import { on } from 'vuikit/core/helpers/dom/event'
import { includes, debounce } from 'vuikit/core/util'
import { height } from 'vuikit/core/helpers/dom/position'

import core from './core'
import ModalTransition from './transition'
import ModalBtnClose from './ui/button-close'

export default {
  name: 'Modal',
  extends: core,
  components: {
    ModalBtnClose,
    ModalTransition
  },
  props: {
    // determines if close button should be displayed
    closeBtn: {
      type: [Boolean, String],
      default: false,
      validator: val => !val || includes([true, 'outside'], val)
    },
    // determines if the modal should auto
    // adjust the height overflow
    overflowAuto: {
      type: Boolean,
      default: false
    },
    // expands the modal dialog to the default Container width
    container: {
      type: Boolean,
      default: false
    },
    // vertically centers the modal dialog
    center: {
      type: Boolean,
      default: false
    },
    // allows setting the dialog with using the uk-width-* classes
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    widthClasses () {
      return this.width
        ? this.width.split(' ').map(width => `uk-width-${width}`)
        : ''
    }
  },
  methods: {
    updateOverflowAuto () {
      if (!this.overflowAuto) {
        return
      }

      this.$nextTick(() => {
        const modal = this.$el
        const modalBody = this.$refs.body
        const modalDialog = this.$refs.dialog

        css(modalBody, 'maxHeight', '150px')
        const maxHeight = Math.max(150, 150 + height(modal) - modalDialog.offsetHeight)
        css(modalBody, 'maxHeight', `${maxHeight}px`)
      })
    }
  },
  mounted () {
    // init global events
    on(window, 'resize', debounce(() => {
      if (!this.show) {
        return
      }

      this.updateOverflowAuto()
    }, 30), this._uid)
  }
}
</script>
