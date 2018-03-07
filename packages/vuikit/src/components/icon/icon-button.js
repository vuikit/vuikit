import core from './core'
import Element from './elements/icon-button'
import mergeData from 'vuikit/src/util/vue-data-merge'

export default {
  name: 'VkIconButton',
  functional: true,
  props: core.props,
  render (h, { data, props }) {
    return h(Element, data, [
      h(core, mergeData(data, { props }))
    ])
  }
}
