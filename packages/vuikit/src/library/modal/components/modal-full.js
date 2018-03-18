import core from './core'
import Transition from '../transition'
import { ElementModalFull, ElementModalDialog } from '../elements'

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

    const modal = h(ElementModalFull, def, [
      h(ElementModalDialog, {
        class: 'uk-flex uk-flex-center uk-flex-middle',
        directives: [{
          name: 'vk-height-viewport'
        }]
      }, this.$slots.default)
    ])

    return h(Transition, [ modal ])
  }
}
