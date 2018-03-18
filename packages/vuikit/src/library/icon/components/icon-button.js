import { mergeData } from 'vuikit/src/util/vue'

import core from './core'
import { ElementIconButton } from '../elements'

export default {
  name: 'VkIconButton',
  functional: true,
  props: core.props,
  render (h, { data, props }) {
    return h(ElementIconButton, data, [
      h(core, mergeData(data, { props }))
    ])
  }
}
