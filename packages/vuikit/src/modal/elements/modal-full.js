import VkModalElDialog from './modal--dialog'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  render (h, { data, props, children }) {
    return h('div', mergeData(data, {
      class: 'uk-modal uk-modal-full',
      style: {
        display: 'block'
      }
    }), [

      h(VkModalElDialog, {
        class: 'uk-height-viewport'
      }, children)

    ])
  }
}
