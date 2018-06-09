import { assign } from 'vuikit/src/_core/utils/object'

import core from '../core'
import { ElIconButton } from '../elements'

export default {
  name: 'VkIconButton',
  functional: true,
  props: assign({}, core.props, ElIconButton.props),
  render (h, { data, props }) {
    return h(ElIconButton, data, [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
