import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { core } from 'vuikit/src/icon'
import { VkIconnavElItem } from '../elements'

export default {
  functional: true,
  props: assign({}, core.props, VkIconnavElItem.props),
  render (h, { data, props }) {
    return h(VkIconnavElItem, mergeData(data, { props }), [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
