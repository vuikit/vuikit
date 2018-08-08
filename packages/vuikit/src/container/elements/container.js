import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    size: {
      type: String,
      validator: val => !val || /^(xsmall|small|large|expand)$/.test(val)
    }
  },
  render (h, { props, data, children }) {
    const { size } = props

    return h('div', mergeData(data, {
      class: ['uk-container', {
        [`uk-container-${size}`]: size
      }]
    }), children)
  }
}
