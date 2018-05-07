import core from './core'
import Transition from '../transition'
import { ElModalFull } from '../elements'

import { each } from '@vuikit/utils/lang'
import VkHeightViewport from 'vuikit/src/height-viewport'

export default {
  name: 'VkModalFull',
  extends: core,
  props: {
    closeBtn: {
      type: Boolean,
      default: false
    },
    closeBtnLarge: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    VkHeightViewport
  },
  render (h) {
    Object.keys(this.$slots).forEach(slot => each(this.$slots[slot], node => {
      if (node.fnOptions && node.fnOptions.name === 'ElModalClose') {
        node.data.staticClass = 'uk-modal-close-full'
      }
    }))

    const modal = h(ElModalFull, {
      props: {
        expand: 'full'
      },
      directives: [{
        name: 'show',
        value: this.show
      }]
    }, [
      this.$slots.default
    ])

    return h(Transition, [ modal ])
  }
}
