import { mergeData } from 'vuikit/src/util/vue'

import core from './core'
import { ElementIcon } from '../elements'

export default {
  name: 'VkIcon',
  functional: true,
  props: core.props,
  render (h, { data, props }) {
    return h(ElementIcon, data, [
      h(core, mergeData(data, { props }))
    ])
  }
}
