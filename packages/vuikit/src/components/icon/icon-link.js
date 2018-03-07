import core from './core'
import Element from './elements/icon-link'
import mergeData from 'vuikit/src/util/vue-data-merge'
import { assign } from 'vuikit/src/util/lang'

export default {
  name: 'VkIconLink',
  functional: true,
  props: assign({}, core.props, Element.props),
  render (h, { data, props }) {
    const def = mergeData(data, { props })
    return h(Element, def, [ h(core, def) ])
  }
}
