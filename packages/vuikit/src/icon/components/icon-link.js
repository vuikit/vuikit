import { assign } from '@vuikit/utils/lang'
import { mergeData } from '@vuikit/utils/vue'

import core from './core'
import { ElIconLink } from '../elements'

export default {
  name: 'VkIconLink',
  functional: true,
  props: assign({}, core.props, ElIconLink.props),
  render (h, { data, props }) {
    const def = mergeData(data, { props })
    return h(ElIconLink, def, [ h(core, def) ])
  }
}
