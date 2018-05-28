import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  render (h, { data }) {
    return h('legend', mergeData(data, {
      class: 'uk-legend'
    }))
  }
}
