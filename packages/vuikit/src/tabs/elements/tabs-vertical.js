import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: {
    align: {
      type: String,
      default: 'left',
      validator: val => !val || /^(left|right)$/.test(val)
    }
  },
  render: (h, { props, data, children }) => {
    const { align } = props

    return h('ul', mergeData(data, {
      class: ['uk-tab', `uk-tab-${align}`]
    }), children)
  }
}
