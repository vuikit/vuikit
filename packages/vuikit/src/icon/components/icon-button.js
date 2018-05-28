import { mergeData } from 'vuikit/src/_core/utils/vue'

import core from './core'
import { ElIconButton } from '../elements'

export default {
  name: 'VkIconButton',
  functional: true,
  props: core.props,
  render (h, { data, props }) {
    return h(ElIconButton, data, [
      h(core, mergeData(data, { props }))
    ])
  }
}
