import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  render (h, { children, data, props }) {
    return h('div', mergeData(data, {
      class: 'uk-modal uk-modal-full',
      style: {
        display: 'block'
      }
    }), children)
  }
}
