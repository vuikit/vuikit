import { mergeData } from 'vuikit/src/util/vue'

export default {
  functional: true,
  render: (h, { data, children }) =>
    h('div', mergeData(data, {
      class: 'uk-panel'
    }), children)
}
