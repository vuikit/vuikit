import { mergeData } from '@vuikit/utils/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('div', mergeData(data, {
      class: 'uk-button-group'
    }), children)
  }
}
