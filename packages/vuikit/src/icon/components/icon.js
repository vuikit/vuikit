import { mergeData } from 'vuikit/src/_core/utils/vue'

import core from './core'
import { ElIcon } from '../elements'

export default {
  name: 'VkIcon',
  functional: true,
  props: core.props,
  render (h, { data, props }) {
    return h(ElIcon, data, [
      h(core, mergeData(data, { props }))
    ])
  }
}
