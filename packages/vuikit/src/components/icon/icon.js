import core from './core'
import Element from './elements/icon'
import { mergeData } from 'vuikit/src/util/vue'

export default {
  name: 'VkIcon',
  functional: true,
  props: core.props,
  render (h, { data, props }) {
    return h(Element, data, [
      h(core, mergeData(data, { props }))
    ])
  }
}
