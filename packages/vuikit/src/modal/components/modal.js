import core from './core'
import Transition from '../transition'
import { assign, each } from 'vuikit/src/_core/utils/lang'
import VkModalOverflowAuto from '../directives/overflow-auto'

import {
  ElModal,
  ElModalBody,
  ElModalHeader,
  ElModalFooter
} from '../elements'

export default {
  name: 'VkModal',
  extends: core,
  directives: {
    VkModalOverflowAuto
  },
  props: assign({}, ElModal.props, {
    // lazy: {}, TODO: Conditionally renders content on mounted. Will only render content if activated
    // enables the auto-overflow feature
    scrollable: {
      type: Boolean,
      default: false
    },
    // clicking outside will not dismiss the dialog
    persistent: {
      type: Boolean,
      default: false
    },
    // close button display
    closeBtn: {
      type: Boolean,
      default: true
    }
  }),
  render (h) {
    Object.keys(this.$slots).forEach(slot => each(this.$slots[slot], node => {
      if (node.fnOptions && node.fnOptions.name === 'ElModalClose') {
        node.data.staticClass = 'uk-modal-close-default'
      }
    }))

    const modal = h(ElModal, {
      props: {
        centered: this.centered,
        expanded: this.expanded
      },
      directives: [
        { name: 'show', value: this.show },
        this.scrollable ? { name: 'vk-modal-overflow-auto' } : {}
      ]
    }, [
      this.$slots.header && h(ElModalHeader, this.$slots.header),
      this.$slots.dialog && this.$slots.dialog, // slot for customizations
      this.$slots.default && h(ElModalBody, this.$slots.default),
      this.$slots.footer && h(ElModalFooter, this.$slots.footer)
    ])

    return h(Transition, [ modal ])
  }
}
