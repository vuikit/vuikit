import core from './core'
import Transition from '../transition'
import { TOGGLE } from '../constants'
import { ElementModalFull, ElementModalDialog } from '../elements'

import { each, assign } from 'vuikit/src/util/lang'
import VkHeightViewport from 'vuikit/src/library/height-viewport'

export default {
  name: 'VkModalFull',
  extends: core,
  directives: {
    VkHeightViewport
  },
  render (h) {
    const def = {
      props: {
        expand: 'full'
      },
      directives: [{
        name: 'show',
        value: this.show
      }]
    }

    Object.keys(this.$slots).forEach(slot => each(this.$slots[slot], node => {
      if (node.fnOptions && node.fnOptions.name === 'VkModalFullClose') {
        assign(node.data, {
          on: assign({ click: e => this.$emit(TOGGLE, false) }, node.data.on || {})
        })
      }
    }))

    const modal = h(ElementModalFull, def, [
      h(ElementModalDialog, {
        directives: [{
          name: 'vk-height-viewport'
        }]
      }, this.$slots.default)
    ])

    return h(Transition, [ modal ])
  }
}
