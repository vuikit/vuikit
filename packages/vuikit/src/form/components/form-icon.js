import { assign } from 'vuikit/src/_core/utils/object'
import { mergeData } from 'vuikit/src/_core/utils/vue'

import { core } from 'vuikit/src/icon'
import { ElFormIcon } from '../elements'

export default {
  functional: true,
  name: 'VkFormIcon',
  props: assign({}, core.props, ElFormIcon.props),
  render (h, { props, data, attrs }) {
    return h(ElFormIcon, mergeData(data, { props }), [
      h(core, { attrs: data.attrs, props })
    ])
  }
}
