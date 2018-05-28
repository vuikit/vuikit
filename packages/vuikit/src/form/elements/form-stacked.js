import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('form', mergeData(data, {
      class: 'uk-form-stacked'
    }), children)
  }
}
