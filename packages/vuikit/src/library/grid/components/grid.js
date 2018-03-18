import { toggleClass } from 'vuikit/src/util/class'
import { assign } from 'vuikit/src/util/lang'

import { ElementGrid } from '../elements'
import VkMargin from 'vuikit/src/library/margin'

export default {
  name: 'VkGrid',
  directives: { VkMargin },
  props: assign({}, ElementGrid.props, {
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

    return h(ElementGrid, {
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
