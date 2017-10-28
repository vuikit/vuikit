<template>
  <modal-transition
    @enter="updateOverflowAuto"
  >
    <div ref="modal"
      v-show="show"
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
        <!-- close button -->
        <modal-btn-close
          v-if="closeBtn"
          :type="closeBtn"
          class="uk-modal-close-default"
          @click="$emit('update:show', false)"
        ></modal-btn-close>

        <!-- header -->
        <div ref="header"
          v-if="$slots.header || $slots.title"
          class="uk-modal-header"
        >
          <slot name="header" />
        </div>

        <!-- body -->
        <div ref="body"
          :class="['uk-modal-body', {
            'uk-overflow-auto': overflowAuto
          }]"
        >
          <slot />
        </div>

        <!-- footer -->
        <div ref="footer"
          v-if="$slots.footer"
          class="uk-modal-footer"
        >
          <slot name="footer" />
        </div>

      </div>
    </div>
  </modal-transition>
</template>

<script>
import { height } from '~/helpers/position'
import { on, off, css, debounce, includes } from '@vuikit/util'

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
    show: {
      type: Boolean,
      default: false
    },
    // determines if close button should be displayed
    closeBtn: {
      type: [Boolean, String],
      default: true,
      validator: val => !val || includes([true, 'outside'], val)
    },
    // determines if the modal should auto
    // adjust the height overflow
    overflowAuto: {
      type: Boolean,
      default: false
    },
    container: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
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

      const modal = this.$el
      const modalBody = this.$refs.body
      const modalDialog = this.$refs.dialog

      css(modalBody, 'maxHeight', '150px')
      const maxHeight = Math.max(150, 150 + height(modal) - modalDialog.offsetHeight)
      css(modalBody, 'maxHeight', `${maxHeight}px`)
    }
  },
  mounted () {
    on(window, 'resize', debounce(() => {
      if (!this.show) {
        return
      }

      this.updateOverflowAuto()
    }, 30), this._uid)
  },
  beforeDestroy () {
    off(window, 'resize', this._uid)
  }
}
</script>
