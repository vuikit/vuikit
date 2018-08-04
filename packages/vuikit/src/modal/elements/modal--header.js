import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  render (h, { props, data, children }) {
    return h('div', mergeData(data, {
      class: 'uk-modal-header'
    }), children)
  }
}
