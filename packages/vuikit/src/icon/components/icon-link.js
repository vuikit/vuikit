import { assign } from 'vuikit/src/_core/utils/object'

import core from '../core'
import { VkIconElLink } from '../elements'

export default {
  functional: true,
  props: assign({}, core.props, VkIconElLink.props),
  render (h, { data, props }) {
    return h(VkIconElLink, assign(data, { props }), [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
