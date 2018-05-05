import { mergeData } from '@vuikit/utils/vue'

export default {
  functional: true,
  render (h, { props, data, children }) {
    return h('div', mergeData(data, {
      class: 'uk-modal-dialog'
    }), children)
  }
}
