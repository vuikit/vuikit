import { toggleClass } from 'vuikit/src/_core/utils/class'
import { assign } from 'vuikit/src/_core/utils/lang'

import { ElGrid } from './elements'
import VkMargin from 'vuikit/src/margin'

export default {
  name: 'VkGrid',
  directives: { VkMargin },
  props: assign({}, ElGrid.props, {
    margin: {
      type: String,
      default: 'uk-grid-margin'
    },
    firstColumn: {
      type: String,
      default: 'uk-first-column'
    }
  }),
  render (h) {
    const clsStack = 'uk-grid-stack'
    const { margin, firstColumn } = this

    return h(ElGrid, {
      props: this.$props,
      directives: [{
        name: 'vk-margin',
        value: {
          margin,
          firstColumn,
          onUpdate: (el, { stacks }) => {
            toggleClass(el, clsStack, stacks)
          }
        }
      }]
    }, this.$slots.default)
  }
}
