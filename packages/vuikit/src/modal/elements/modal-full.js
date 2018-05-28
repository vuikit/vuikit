import ElModalDialog from './modal--dialog'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  name: 'ElModalFull',
  render (h, { data, props, children }) {
    return h('div', mergeData(data, {
      class: 'uk-modal uk-modal-full',
      style: {
        display: 'block'
      }
    }), [

      h(ElModalDialog, {
        class: 'uk-flex uk-flex-center uk-flex-middle',
        directives: [{
          name: 'vk-height-viewport'
        }]
      }, children)

    ])
  }
}
