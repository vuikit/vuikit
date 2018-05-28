import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  render (h, { data }) {
    return h('input', mergeData(data, {
      class: 'uk-range',
      attrs: {
        type: 'range'
      }
    }))
  }
}
