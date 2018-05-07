import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('div', mergeData(data, {
      class: 'uk-offcanvas-content'
    }), children)
  }
}
