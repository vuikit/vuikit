import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  render (h, { data }) {
    return h('fieldset', mergeData(data, {
      class: 'uk-fieldset'
    }))
  }
}
