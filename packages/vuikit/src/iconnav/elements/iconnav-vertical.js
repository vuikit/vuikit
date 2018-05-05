import { mergeData } from '@vuikit/utils/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('ul', mergeData(data, {
      class: 'uk-iconnav uk-iconnav-vertical'
    }), children)
  }
}
