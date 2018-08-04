import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { core } from 'vuikit/src/icon'
import { VkFormElIconLink } from '../elements'

export default {
  functional: true,
  props: assign({}, core.props, VkFormElIconLink.props),
  render (h, { props, data, attrs }) {
    return h(VkFormElIconLink, mergeData(data, { props }), [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
