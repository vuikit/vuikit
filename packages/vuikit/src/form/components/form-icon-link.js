import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { core } from 'vuikit/src/icon'
import { ElFormIconLink } from '../elements'

export default {
  functional: true,
  name: 'VkFormIconLink',
  props: assign({}, core.props, ElFormIconLink.props),
  render (h, { props, data, attrs }) {
    return h(ElFormIconLink, mergeData(data, { props }), [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
