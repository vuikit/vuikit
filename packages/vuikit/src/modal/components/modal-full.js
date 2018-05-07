import core from './core'
import Transition from '../transition'
import { TOGGLE } from '../constants'
import { ElModalFull, ElModalDialog } from '../elements'

import { each, assign } from '@vuikit/utils/lang'
import VkHeightViewport from 'vuikit/src/height-viewport'

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
          on: { click: e => this.$emit(TOGGLE, false) }
        })
      }
    }))

    const modal = h(ElModalFull, def, [
      h(ElModalDialog, {
        class: 'uk-flex uk-flex-center uk-flex-middle',
        directives: [{
          name: 'vk-height-viewport'
        }]
      }, this.$slots.default)
    ])

    return h(Transition, [ modal ])
  }
}