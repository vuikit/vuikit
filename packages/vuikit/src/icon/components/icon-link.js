import { assign } from 'vuikit/src/_core/utils/object'

import core from '../core'
import { ElIconLink } from '../elements'

export default {
  name: 'VkIconLink',
  functional: true,
  props: assign({}, core.props, ElIconLink.props),
  render (h, { data, props }) {
    return h(ElIconLink, assign(data, { props }), [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
