import { get } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import Transition from '../transition'
import VkModalOverflowAuto from '../directives/overflow-auto'

import core from '../core'
import { mixinActive, mixinPage } from '../mixins'
import { ElModal, ElModalBody, ElModalHeader, ElModalFooter } from '../elements'

import { SHOW, SHOWN, HIDE, HIDDEN } from '../constants'

export default {
  name: 'VkModal',
  extends: core,
  mixins: [ mixinActive, mixinPage ],
  directives: { VkModalOverflowAuto },
  props: {
    // lazy: {}, TODO: Conditionally renders content on mounted. Will only render content if activated
    // enables the auto-overflow feature
    scrollable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    open: false
  }),
  render (h) {
    // workaround to add a default modifier class to the close button
    this.$slots.default.forEach(node => {
      if (get(node, 'fnOptions.name') === 'ElModalClose') {
        node.data = mergeData(node.data, { class: 'uk-modal-close-default' })
      }
    })

    const modal = h(ElModal, {
      class: {
        'uk-open': this.open
      },
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

    return h(Transition, {
      props: { appear: true },
      on: {
        beforeEnter: () => {
          this.$emit(SHOW)
          this.setPage()
        },
        enter: () => {
          this.open = true
        },
        afterEnter: () => {
          this.setAsActive()
          this.$emit(SHOWN)
        },
        beforeLeave: () => {
          this.$emit(HIDE)
          this.open = false
        },
        afterLeave: () => {
          this.setAsInactive()
          this.$emit(HIDDEN)
          this.resetPage()
        }
      }
    }, [ modal ])
  }
}
