import { mergeData } from '@vuikit/utils/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('a', mergeData(data, {
      class: 'uk-navbar-item uk-logo'
    }), children)
  }
}
