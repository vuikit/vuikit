import { get } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import core from '../core'
import Transition from '../transition'
import { mixinPage } from '../mixins'

import { ElModalFull } from '../elements'
import VkHeightViewport from 'vuikit/src/height-viewport'

import { SHOW, SHOWN, HIDE, HIDDEN } from '../constants'

export default {
  name: 'VkModalFull',
  extends: core,
  mixins: [ mixinPage ],
  directives: { VkHeightViewport },
  data: () => ({
    open: false
  }),
  render (h) {
    // workaround to add a full modifier class to the close button
    this.$slots.default.forEach(node => {
      if (get(node, 'fnOptions.name') === 'ElModalClose') {
        node.data = mergeData(node.data, { class: 'uk-modal-close-full' })
      }
    })

    const modal = h(ElModalFull, {
      class: {
        'uk-open': this.open
      },
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
          this.$emit(SHOWN)
        },
        beforeLeave: () => {
          this.$emit(HIDE)
          this.open = false
        },
        afterLeave: () => {
          this.$emit(HIDDEN)
          this.resetPage()
        }
      }
    }, [ modal ])
  }
}
