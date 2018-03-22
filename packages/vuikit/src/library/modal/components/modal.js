import core from './core'
import Transition from '../transition'
import VkModalOverflowAuto from '../directives/overflow-auto'

import {
  ElementModal,
  ElementModalBody,
  ElementModalDialog,
  ElementModalHeader,
  ElementModalFooter
} from '../elements'

export default {
  name: 'VkModal',
  extends: core,
  directives: {
    VkModalOverflowAuto
  },
  props: {
    // determines if the modal should be kept
    // open when the background was clicked
    stuck: {
      type: Boolean,
      default: false
    },
    // determines if the modal should auto
    // adjust the height overflow
    overflowAuto: {
      type: Boolean,
      default: false
    },
    // vertically centers the modal dialog
    center: {
      type: Boolean,
      default: false
    },
    // the modal size, `container` or one of
    // the uk-width-* classes without the prefix
    size: {
      type: String,
      default: ''
    },
    // when stacked it will not close
    // any active modal
    stack: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    widthClasses () {
      return this.size
        ? this.size.split(' ').map(size => `uk-width-${size}`)
        : ''
    }
  },
  render (h) {
    const def = {
      class: {
        'uk-flex uk-flex-top': this.center
      },
      style: {
        display: this.center ? 'flex' : 'block'
      },
      props: {
        expand: this.size === 'container'
      },
      directives: [{
        name: 'show',
        value: this.show
      }],
      on: {
        // click: e => {
        //   const bgClicked = event.target === this.$el
        //   if (bgClicked && this.closeOnBg) {
        //     this.hide()
        //   }
        // }
      }
    }

    const modal = h(ElementModal, def, [
      h(ElementModalDialog, {
        class: [this.widthClasses, {
          'uk-margin-auto-vertical': this.center
        }]
      }, [
        // slot meant for customizations
        // for content use the body slot
        this.$slots.dialog && this.$slots.dialog,

        // header slot
        this.$slots.header && h(ElementModalHeader, this.$slots.header),

        // body
        this.$slots.default && h(ElementModalBody, {
          directives: this.overflowAuto
            ? [{ name: 'vk-modal-overflow-auto' }]
            : []
        }, this.$slots.default),

        // footer slot
        this.$slots.footer && h(ElementModalFooter, this.$slots.footer)
      ])
    ])

    return h(Transition, [ modal ])
  }
}
