import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { core } from 'vuikit/src/icon'
import { ElIconnavItem } from '../elements'

export default {
  name: 'VkIconnavItem',
  functional: true,
  props: assign({}, core.props, ElIconnavItem.props),
  render (h, { data, props }) {
    return h(ElIconnavItem, mergeData(data, { props }), [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
