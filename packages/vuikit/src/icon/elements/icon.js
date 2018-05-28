import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  render: (h, { data, children }) =>
    h('span', mergeData(data, {
      class: 'uk-icon'
    }), children)
}
