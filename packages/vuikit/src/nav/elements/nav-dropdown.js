import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('ul', mergeData(data, {
      class: 'uk-nav uk-dropdown-nav'
    }), children)
  }
}
