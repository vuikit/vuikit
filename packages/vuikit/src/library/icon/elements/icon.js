import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  render: (h, { data, children }) =>
    h('span', mergeData(data, {
      class: 'uk-icon'
    }), children)
}
