import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('li', mergeData(data, {
      class: 'uk-nav-header'
    }), children)
  }
}
