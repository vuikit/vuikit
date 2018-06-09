import { assign } from 'vuikit/src/_core/utils/object'

import core from '../core'
import { ElIcon } from '../elements'

export default {
  name: 'VkIcon',
  functional: true,
  props: assign({}, core.props),
  render (h, { data, props }) {
    return h(ElIcon, data, [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
