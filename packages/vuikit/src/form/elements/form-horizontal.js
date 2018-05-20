import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('form', mergeData(data, {
      class: 'uk-form-horizontal'
    }), children)
  }
}
