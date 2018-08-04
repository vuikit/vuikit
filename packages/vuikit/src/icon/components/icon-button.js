import { assign } from 'vuikit/src/_core/utils/object'

import core from '../core'
import { VkIconElButton } from '../elements'

export default {
  functional: true,
  props: assign({}, core.props, VkIconElButton.props),
  render (h, { data, props }) {
    return h(VkIconElButton, data, [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
