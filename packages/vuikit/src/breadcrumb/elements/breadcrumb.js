import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  render: (h, { props, data, children }) => {
    return h('ul', mergeData(data, {
      class: 'uk-breadcrumb'
    }), children)
  }
}
