import { assign } from 'vuikit/src/util/lang'
import { mergeData } from 'vuikit/src/util/vue'

import core from './core'
import { ElementIconLink } from '../elements'

export default {
  name: 'VkIconLink',
  functional: true,
  props: assign({}, core.props, ElementIconLink.props),
  render (h, { data, props }) {
    const def = mergeData(data, { props })
    return h(ElementIconLink, def, [ h(core, def) ])
  }
}
