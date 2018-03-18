import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  render (h, { props, data, children }) {
    return h('div', mergeData(data, {
      class: 'uk-modal-body'
    }), children)
  }
}
