import { mergeData } from '@vuikit/utils/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('div', mergeData(data, {
      class: 'uk-offcanvas',
      style: {
        display: 'block'
      }
    }), children)
  }
}
