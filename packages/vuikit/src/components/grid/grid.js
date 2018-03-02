import { toggleClass } from 'vuikit/src/util/class'
import { assign } from 'vuikit/src/util/lang'

import Element from './elements/grid'
import VkMargin from 'vuikit/src/directives/margin'

export default {
  name: 'VkGrid',
  directives: { VkMargin },
  props: assign({}, Element.props, {
    margin: {
      type: String,
      default: 'uk-grid-margin'
    },
    firstColumn: {
      type: String,
      default: 'uk-first-column'
    },
    clsStack: {
      type: String,
      default: 'uk-grid-stack'
    }
  }),
  render (h) {
    const { margin, firstColumn, clsStack } = this

    return h(Element, {
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
