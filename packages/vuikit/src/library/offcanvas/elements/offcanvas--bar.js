import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('div', mergeData(data, {
      class: 'uk-offcanvas-bar'
    }), children)
  }
}
