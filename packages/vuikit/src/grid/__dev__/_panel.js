import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  render: (h, { data, children }) =>
    h('div', mergeData(data, {
      class: 'uk-panel'
    }), children)
}
