import VkModalElDialog from './modal--dialog'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    // vertically expands the modal
    expanded: {
      type: Boolean,
      default: false
    },
    // vertically centers the modal
    centered: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props, children }) {
    const { expanded, centered } = props

    return h('div', mergeData(data, {
      class: ['uk-modal', {
        'uk-modal-container': expanded,
        'uk-flex uk-flex-top': centered
      }],
      style: {
        display: centered ? 'flex' : 'block'
      }
    }), [

      h(VkModalElDialog, {
        class: {
          'uk-margin-auto-vertical': centered
        }
      }, children)

    ])
  }
}
