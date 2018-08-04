import { assign } from 'vuikit/src/_core/utils/object'

import core from '../core'
import { VkIconEl } from '../elements'

export default {
  functional: true,
  props: assign({}, core.props),
  render (h, { data, props }) {
    return h(VkIconEl, data, [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
