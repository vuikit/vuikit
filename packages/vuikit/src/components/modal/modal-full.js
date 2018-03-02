import core from './core'
import Transition from './transition'
import ModalFull from './elements/modal-full'
import ModalDialog from './elements/modal-dialog'

import VkHeightViewport from 'vuikit/src/directives/height-viewport'

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

    const modal = h(ModalFull, def, [
      h(ModalDialog, {
        class: 'uk-flex uk-flex-center uk-flex-middle',
        directives: [{
          name: 'vk-height-viewport'
        }]
      }, this.$slots.default)
    ])

    return h(Transition, [ modal ])
  }
}
