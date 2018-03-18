import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('a', mergeData(data, {
      class: 'uk-icon uk-icon-button'
    }), children)
  }
}
