import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { core } from 'vuikit/src/icon'
import { VkFormElIcon } from '../elements'

export default {
  functional: true,
  props: assign({}, core.props, VkFormElIcon.props),
  render (h, { props, data, attrs }) {
    return h(VkFormElIcon, mergeData(data, { props }), [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
