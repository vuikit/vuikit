import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  name: 'ElModalFooter',
  render (h, { props, data, children }) {
    return h('div', mergeData(data, {
      class: 'uk-modal-footer'
    }), children)
  }
}
